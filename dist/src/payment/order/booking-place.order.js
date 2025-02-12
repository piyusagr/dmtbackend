"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingPlaceOrder = void 0;
const abstract_order_1 = require("./base/abstract.order");
class BookingPlaceOrder extends abstract_order_1.Order {
    constructor(amount, currency) {
        super(amount, currency);
    }
}
exports.BookingPlaceOrder = BookingPlaceOrder;
//# sourceMappingURL=booking-place.order.js.map