import { Order } from "./base/abstract.order";

export class BoostEventOrder extends Order {
  constructor(amount: number, currency: string) {
    super(amount, currency);
  }
}