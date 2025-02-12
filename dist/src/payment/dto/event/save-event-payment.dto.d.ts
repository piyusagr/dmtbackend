import { PaymentContext } from "@prisma/client";
import { CreatedPayment } from "src/payment/type/created-payment.type";
import { PaymentMetadata } from "src/payment/type/payment-metadata.type";
export declare class SaveEventPaymentDto {
    userId: number;
    createdPayment: CreatedPayment;
    paymentMetadata: PaymentMetadata;
    paymentContext: PaymentContext;
}
