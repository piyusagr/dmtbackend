import { Order } from "./base/abstract.order";

export class OnlineEventOrder extends Order {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}