import { Order } from "./base/abstract.order";

export class OnsiteEventOrder extends Order {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}