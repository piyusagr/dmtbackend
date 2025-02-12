"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnlineEventOrder = void 0;
const abstract_order_1 = require("./base/abstract.order");
class OnlineEventOrder extends abstract_order_1.Order {
    constructor(amount, currency) {
        super(amount, currency);
    }
}
exports.OnlineEventOrder = OnlineEventOrder;
//# sourceMappingURL=online-event.order.js.map