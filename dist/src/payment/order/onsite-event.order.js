"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OnsiteEventOrder = void 0;
const abstract_order_1 = require("./base/abstract.order");
class OnsiteEventOrder extends abstract_order_1.Order {
    constructor(amount, currency) {
        super(amount, currency);
    }
}
exports.OnsiteEventOrder = OnsiteEventOrder;
//# sourceMappingURL=onsite-event.order.js.map