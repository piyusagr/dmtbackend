"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const create_payment_dto_1 = require("../../dto/create-payment.dto");
class Order {
    constructor(amount, currency) {
        this.currency = currency;
        this.amount = parseFloat((amount.toFixed(2)));
    }
    getOrderDto() {
        const createOrderDto = new create_payment_dto_1.CreatePaymentDto();
        createOrderDto.amount = this.amount;
        createOrderDto.currency = this.currency;
        return createOrderDto;
    }
    ;
}
exports.Order = Order;
//# sourceMappingURL=abstract.order.js.map