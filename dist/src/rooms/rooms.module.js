"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RoomsModule = void 0;
const common_1 = require("@nestjs/common");
const rooms_service_1 = require("./rooms.service");
const rooms_controller_1 = require("./rooms.controller");
const casl_ability_factory_1 = require("../../common/auth/casl-ability.factory");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let RoomsModule = class RoomsModule {
};
exports.RoomsModule = RoomsModule;
exports.RoomsModule = RoomsModule = __decorate([
    (0, common_1.Module)({
        controllers: [rooms_controller_1.RoomsController],
        providers: [
            rooms_service_1.RoomsService,
            casl_ability_factory_1.CaslAbilityFactory,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
    })
], RoomsModule);
//# sourceMappingURL=rooms.module.js.map