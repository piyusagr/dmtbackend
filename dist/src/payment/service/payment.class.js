"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const create_payment_dto_1 = require("../dto/create-payment.dto");
class Payment {
    constructor(paymentDto) {
        const { totalAmount, paymentCurrency } = paymentDto;
        this._totalAmount = parseFloat(totalAmount.toFixed(2));
        this._paymentCurrency = paymentCurrency;
    }
    getCreatePaymentDto() {
        const createOrderDto = new create_payment_dto_1.CreatePaymentDto();
        createOrderDto.amount = this._totalAmount;
        createOrderDto.currency = this._paymentCurrency;
        return createOrderDto;
    }
}
exports.Payment = Payment;
//# sourceMappingURL=payment.class.js.map