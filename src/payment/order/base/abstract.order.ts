import { CreatePaymentDto } from "src/payment/dto/create-payment.dto";

export abstract class Order {
  private amount: number;
  private currency: string;

  constructor(amount: number, currency: string) {
    this.currency = currency;
    this.amount = parseFloat((amount.toFixed(2)));
  }

  getOrderDto(): CreatePaymentDto {
    const createOrderDto = new CreatePaymentDto();

    createOrderDto.amount = this.amount;
    createOrderDto.currency = this.currency;

    return createOrderDto;
  };
}