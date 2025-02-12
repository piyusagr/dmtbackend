import { CreatePaymentDto } from "src/payment/dto/create-payment.dto";
import { PaymentDto } from "src/payment/dto/payment.dto";
export declare class Payment {
    private readonly _totalAmount;
    private readonly _paymentCurrency;
    constructor(paymentDto: PaymentDto);
    getCreatePaymentDto(): CreatePaymentDto;
}
