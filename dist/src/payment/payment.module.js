"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModule = void 0;
const common_1 = require("@nestjs/common");
const payment_service_1 = require("./service/payment.service");
const payment_controller_1 = require("./payment.controller");
const events_module_1 = require("../events/events.module");
const payment_repository_1 = require("./payment.repository");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const places_module_1 = require("../places/places.module");
const place_buyer_history_module_1 = require("../places-buyer-history/place-buyer-history.module");
const event_booster_buyer_history_module_1 = require("../event-booster-buyer-history/event-booster-buyer-history.module");
const event_buyer_history_module_1 = require("../event-buyer-history/event-buyer-history.module");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let PaymentModule = class PaymentModule {
};
exports.PaymentModule = PaymentModule;
exports.PaymentModule = PaymentModule = __decorate([
    (0, common_1.Module)({
        controllers: [payment_controller_1.PaymentController],
        providers: [
            payment_service_1.PaymentService,
            payment_repository_1.PaymentRepository,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
        imports: [
            events_module_1.EventsModule,
            places_module_1.PlacesModule,
            (0, common_1.forwardRef)(() => place_buyer_history_module_1.PlaceBuyerHistoryModule),
            (0, common_1.forwardRef)(() => event_buyer_history_module_1.EventBuyerHistoryModule),
            (0, common_1.forwardRef)(() => event_booster_buyer_history_module_1.EventBoosterBuyerHistoryModule),
        ],
        exports: [payment_service_1.PaymentService],
    })
], PaymentModule);
//# sourceMappingURL=payment.module.js.map