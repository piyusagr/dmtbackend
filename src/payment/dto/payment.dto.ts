import { PaymentContext, PaymentSetting } from "@prisma/client";
import { PaymentService } from "../service/payment.service";

export class PaymentDto {
  totalAmount: number;
  paymentCurrency: string;
}