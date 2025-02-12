"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var PaymentService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentService = void 0;
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const payment_error_message_constant_1 = require("../constant/payment-error-message.constant");
const payment_repository_1 = require("../payment.repository");
let PaymentService = PaymentService_1 = class PaymentService {
    constructor(configService, paymentRepository) {
        this.configService = configService;
        this.paymentRepository = paymentRepository;
        this.logger = new common_1.Logger(PaymentService_1.name);
        this.paypalBaseUrl = '';
        this.paypalClientId = '';
        this.paypalClientSecret = '';
        this.paypalBaseUrl = this.configService.get('PAYPAL_BASE_URL');
        this.paypalClientId = this.configService.get('PAYPAL_CLIENT_ID');
        this.paypalClientSecret = this.configService.get('PAYPAL_CLIENT_SECRET');
    }
    async generateAccessToken() {
        const url = `${this.paypalBaseUrl}/v1/oauth2/token`;
        const authString = Buffer.from(`${this.paypalClientId}:${this.paypalClientSecret}`).toString('base64');
        const body = { grant_type: 'client_credentials' };
        const headers = {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Basic ${authString}`,
        };
        let response = '';
        try {
            const { data } = await axios_1.default.post(url, body, { headers });
            response = data;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException(payment_error_message_constant_1.errorMessage.failToProcessPayment);
        }
        return response?.access_token;
    }
    async createPayment(createPaymentDto) {
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
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            const { data } = await axios_1.default.post(url, body, { headers });
            return data;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException(payment_error_message_constant_1.errorMessage.failToProcessPayment);
        }
    }
    async capturePayment(orderID) {
        const url = `${this.paypalBaseUrl}/v2/checkout/orders/${orderID}/capture`;
        const accessToken = await this.generateAccessToken();
        const headers = {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
        };
        try {
            const { data } = await axios_1.default.post(url, {}, { headers });
            return data;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException(payment_error_message_constant_1.errorMessage.failToProcessPayment);
        }
    }
    async payout(payoutDto) {
        const paymentSetting = await this.getPaymentSetting();
        const url = `${this.paypalBaseUrl}/v1/payments/payouts`;
        const accessToken = await this.generateAccessToken();
        const headers = {
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
            const { data } = await axios_1.default.post(url, body, { headers });
            return data;
        }
        catch (error) {
            this.logger.error(error);
            throw new common_1.InternalServerErrorException(payment_error_message_constant_1.errorMessage.failToProcessPayment);
        }
    }
    async getPaymentSetting() {
        return await this.paymentRepository.getPaymentSetting();
    }
    async savePaymentRecord(savePaymentDto) {
        const { userId, createdPayment, paymentMetadata, paymentContext } = savePaymentDto;
        const { totalAmount, nextPaymentAmount, haveNextPayment } = paymentMetadata;
        const paymentRecord = {
            context: paymentContext,
            amount: totalAmount,
            haveNextPayment,
            nextPaymentAmount,
            refId: createdPayment.id,
            User: { connect: { id: userId } },
        };
        return await this.paymentRepository.createPayment(paymentRecord);
    }
    async updatePaymentRecord(refId, capturedPayment) {
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
        const feeAmount = parseFloat(((fee * amount) / 100 + currencyFixRate).toFixed(2));
        const totalAmount = amount - feeAmount;
        const payerName = `${payer.name.given_name} ${payer.name.surname}`;
        const paymentRecord = {
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
    async findOneById(id) {
        const payment = await this.paymentRepository.findOneById(id);
        if (!payment) {
            throw new common_1.NotFoundException(payment_error_message_constant_1.errorMessage.paymentNotFound);
        }
        return payment;
    }
    async findOneByRefId(refId) {
        const payment = await this.paymentRepository.findOneByRefId(refId);
        if (!payment) {
            throw new common_1.NotFoundException(payment_error_message_constant_1.errorMessage.paymentNotFound);
        }
        return payment;
    }
};
exports.PaymentService = PaymentService;
exports.PaymentService = PaymentService = PaymentService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService,
        payment_repository_1.PaymentRepository])
], PaymentService);
//# sourceMappingURL=payment.service.js.map