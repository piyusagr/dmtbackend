import axios, { RawAxiosRequestHeaders } from 'axios';
import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Prisma } from '@prisma/client';
import { errorMessage } from '../constant/payment-error-message.constant';
import { PaymentRepository } from '../payment.repository';
import { SaveEventPaymentDto } from '../dto/event/save-event-payment.dto';
import { PayoutDto } from '../dto/payout.dto';
import { CreatePaymentDto } from '../dto/create-payment.dto';
import { CreatedPayment } from '../type/created-payment.type';
import { CapturedPayment } from '../type/captured-payment.type';

@Injectable()
export class PaymentService {
  private logger = new Logger(PaymentService.name);

  private readonly paypalBaseUrl: string = '';
  private readonly paypalClientId: string = '';
  private readonly paypalClientSecret: string = '';

  constructor(
    private readonly configService: ConfigService,
    private readonly paymentRepository: PaymentRepository,
  ) {
    this.paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');
    this.paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
    this.paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
  }

  private async generateAccessToken(): Promise<string> {
    const url = `${this.paypalBaseUrl}/v1/oauth2/token`;

    const authString = Buffer.from(
      `${this.paypalClientId}:${this.paypalClientSecret}`,
    ).toString('base64');

    const body = { grant_type: 'client_credentials' };

    const headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${authString}`,
    };

    let response: any = '';

    try {
      const { data } = await axios.post(url, body, { headers });
      response = data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(errorMessage.failToProcessPayment);
    }

    return response?.access_token;
  }

  async createPayment(
    createPaymentDto: CreatePaymentDto,
  ): Promise<CreatedPayment> {
    const url = `${this.paypalBaseUrl}/v2/checkout/orders`;

    const accessToken = await this.generateAccessToken();

    const { currency, amount } = createPaymentDto;

    const body = {
      purchase_units: [
        {
          amount: {
            currency_code: currency,
            value: amount,
          },
        },
      ],
      intent: 'CAPTURE',
    };

    const headers: RawAxiosRequestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const { data } = await axios.post(url, body, { headers });
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(errorMessage.failToProcessPayment);
    }
  }

  async capturePayment(orderID: string): Promise<CapturedPayment> {
    const url = `${this.paypalBaseUrl}/v2/checkout/orders/${orderID}/capture`;

    const accessToken = await this.generateAccessToken();

    const headers: RawAxiosRequestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    try {
      const { data } = await axios.post(url, {}, { headers });
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(errorMessage.failToProcessPayment);
    }
  }

  async payout(payoutDto: PayoutDto) {
    const paymentSetting = await this.getPaymentSetting();

    const url = `${this.paypalBaseUrl}/v1/payments/payouts`;

    const accessToken = await this.generateAccessToken();

    const headers: RawAxiosRequestHeaders = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };

    const { platformCurrency, payoutDomesticFee } = paymentSetting;
    const { toPaypalReceiverId, amount, note, subject, message } = payoutDto;

    const payoutFee = (amount * payoutDomesticFee) / 100;
    const totalAmount = (amount - payoutFee).toFixed(2);

    const body = {
      sender_batch_header: {
        email_subject: subject,
        email_message: message,
      },
      items: [
        {
          recipient_type: 'PAYPAL_ID',
          note,
          receiver: toPaypalReceiverId,
          amount: {
            currency: platformCurrency,
            value: totalAmount,
          },
        },
      ],
    };

    try {
      const { data } = await axios.post(url, body, { headers });
      return data;
    } catch (error) {
      this.logger.error(error);
      throw new InternalServerErrorException(errorMessage.failToProcessPayment);
    }
  }

  async getPaymentSetting() {
    return await this.paymentRepository.getPaymentSetting();
  }

  async savePaymentRecord(savePaymentDto: SaveEventPaymentDto) {
    const { userId, createdPayment, paymentMetadata, paymentContext } =
      savePaymentDto;

    const { totalAmount, nextPaymentAmount, haveNextPayment } = paymentMetadata;

    const paymentRecord: Prisma.PaymentCreateInput = {
      context: paymentContext,
      amount: totalAmount,
      haveNextPayment,
      nextPaymentAmount,
      refId: createdPayment.id,
      User: { connect: { id: userId } },
    };

    return await this.paymentRepository.createPayment(paymentRecord);
  }

  async updatePaymentRecord(refId: string, capturedPayment: CapturedPayment) {
    const paymentSetting = await this.getPaymentSetting();
    const paymentHistory = await this.findOneByRefId(refId);

    const { platformCountryCode, internationalTransactionFee } = paymentSetting;
    const { payer } = capturedPayment;

    let fee = internationalTransactionFee;
    if (platformCountryCode == payer.address.country_code) {
      const { domesticTransactionFee } = paymentSetting;
      fee = domesticTransactionFee;
    }

    const { amount } = paymentHistory;
    const { currencyFixRate } = paymentSetting;

    const feeAmount = parseFloat(
      ((fee * amount) / 100 + currencyFixRate).toFixed(2),
    );
    const totalAmount = amount - feeAmount;
    const payerName = `${payer.name.given_name} ${payer.name.surname}`;

    const paymentRecord: Prisma.PaymentUpdateInput = {
      isPaid: true,
      fee,
      feeAmount,
      totalAmount,
      payerName,
      fixRate: currencyFixRate,
      payerEmail: payer.email_address,
      payerCountryCode: payer.address.country_code,
      payerId: payer.payer_id,
      paidAt: new Date(),
    };
    return await this.paymentRepository.updatePayment(refId, paymentRecord);
  }

  async findOneById(id: string) {
    const payment = await this.paymentRepository.findOneById(id);
    if (!payment) {
      throw new NotFoundException(errorMessage.paymentNotFound);
    }
    return payment;
  }

  async findOneByRefId(refId: string) {
    const payment = await this.paymentRepository.findOneByRefId(refId);
    if (!payment) {
      throw new NotFoundException(errorMessage.paymentNotFound);
    }
    return payment;
  }
}
