"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventBoosterBuyerHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const event_booster_buyer_history_service_1 = require("./event-booster-buyer-history.service");
const event_booster_buyer_history_controller_1 = require("./event-booster-buyer-history.controller");
const event_booster_buyer_history_repository_1 = require("./event-booster-buyer-history.repository");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const payment_module_1 = require("../payment/payment.module");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let EventBoosterBuyerHistoryModule = class EventBoosterBuyerHistoryModule {
};
exports.EventBoosterBuyerHistoryModule = EventBoosterBuyerHistoryModule;
exports.EventBoosterBuyerHistoryModule = EventBoosterBuyerHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [event_booster_buyer_history_controller_1.EventBoosterBuyerHistoryController],
        providers: [
            event_booster_buyer_history_service_1.EventBoosterBuyerHistoryService,
            event_booster_buyer_history_repository_1.EventBoosterBuyerHistoryRepository,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
        imports: [(0, common_1.forwardRef)(() => payment_module_1.PaymentModule)],
        exports: [event_booster_buyer_history_service_1.EventBoosterBuyerHistoryService],
    })
], EventBoosterBuyerHistoryModule);
//# sourceMappingURL=event-booster-buyer-history.module.js.map