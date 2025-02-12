"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlacesModule = void 0;
const common_1 = require("@nestjs/common");
const email_service_1 = require("../../common/services/email/email.service");
const image_service_1 = require("../../common/services/images/image.service");
const places_controller_1 = require("./places.controller");
const places_service_1 = require("./places.service");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../users/users.service");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let PlacesModule = class PlacesModule {
};
exports.PlacesModule = PlacesModule;
exports.PlacesModule = PlacesModule = __decorate([
    (0, common_1.Module)({
        controllers: [places_controller_1.PlacesController],
        providers: [
            image_service_1.ImageService,
            places_service_1.PlacesService,
            email_service_1.EmailService,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
        exports: [places_service_1.PlacesService],
    })
], PlacesModule);
//# sourceMappingURL=places.module.js.map