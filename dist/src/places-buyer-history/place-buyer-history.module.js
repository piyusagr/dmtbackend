"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlaceBuyerHistoryModule = void 0;
const common_1 = require("@nestjs/common");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const place_buyer_history_controller_1 = require("./place-buyer-history.controller");
const place_buyer_history_service_1 = require("./place-buyer-history.service");
const place_buyer_history_repository_1 = require("./place-buyer-history.repository");
const payment_module_1 = require("../payment/payment.module");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let PlaceBuyerHistoryModule = class PlaceBuyerHistoryModule {
};
exports.PlaceBuyerHistoryModule = PlaceBuyerHistoryModule;
exports.PlaceBuyerHistoryModule = PlaceBuyerHistoryModule = __decorate([
    (0, common_1.Module)({
        controllers: [place_buyer_history_controller_1.PlaceBuyerHistoryController],
        providers: [
            place_buyer_history_service_1.PlaceBuyerHistoryService,
            place_buyer_history_repository_1.PlaceBuyerHistoryRepository,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
        imports: [(0, common_1.forwardRef)(() => payment_module_1.PaymentModule)],
        exports: [place_buyer_history_service_1.PlaceBuyerHistoryService],
    })
], PlaceBuyerHistoryModule);
//# sourceMappingURL=place-buyer-history.module.js.map