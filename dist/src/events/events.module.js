"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventsModule = void 0;
const common_1 = require("@nestjs/common");
const events_service_1 = require("./events.service");
const events_controller_1 = require("./events.controller");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
const image_service_1 = require("../../common/services/images/image.service");
let EventsModule = class EventsModule {
};
exports.EventsModule = EventsModule;
exports.EventsModule = EventsModule = __decorate([
    (0, common_1.Module)({
        controllers: [events_controller_1.EventsController],
        providers: [
            events_service_1.EventsService,
            jwt_1.JwtService,
            jwt_utility_service_1.JwtUtilityService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
            image_service_1.ImageService,
        ],
        exports: [events_service_1.EventsService],
    })
], EventsModule);
//# sourceMappingURL=events.module.js.map