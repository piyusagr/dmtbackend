import { CreatePaymentDto } from "../dto/create-payment.dto";
export type PaymentMetadata = {
    totalAmount?: number;
    haveNextPayment: boolean;
    nextPaymentAmount: number;
    createPaymentDto?: CreatePaymentDto;
};
