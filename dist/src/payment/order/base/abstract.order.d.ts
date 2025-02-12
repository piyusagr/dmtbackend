import { CreatePaymentDto } from "src/payment/dto/create-payment.dto";
export declare abstract class Order {
    private amount;
    private currency;
    constructor(amount: number, currency: string);
    getOrderDto(): CreatePaymentDto;
}
