import { PaymentContext, PaymentSetting } from "@prisma/client";
import { CreatePaymentDto } from "src/payment/dto/create-payment.dto";
import { PaymentDto } from "src/payment/dto/payment.dto";
import { PaymentMetadata } from "src/payment/type/payment-metadata.type";
import { PaymentService } from "./payment.service";

export class Payment {
  private readonly _totalAmount: number;
  private readonly _paymentCurrency: string;

  constructor(paymentDto: PaymentDto) {
    const { totalAmount, paymentCurrency } = paymentDto;
    this._totalAmount = parseFloat(totalAmount.toFixed(2));
    this._paymentCurrency = paymentCurrency;
  }

  getCreatePaymentDto(): CreatePaymentDto {
    const createOrderDto = new CreatePaymentDto();
    createOrderDto.amount = this._totalAmount;
    createOrderDto.currency = this._paymentCurrency;
    return createOrderDto;
  }
}