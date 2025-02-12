import { Order } from "./base/abstract.order";

export class BookingPlaceOrder extends Order {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}