"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthModule = void 0;
const common_1 = require("@nestjs/common");
const auth_service_1 = require("./auth.service");
const auth_controller_1 = require("./auth.controller");
const jwt_1 = require("@nestjs/jwt");
const nodemailer_email_service_1 = require("../../common/services/email/nodemailer-email.service");
const users_service_1 = require("../users/users.service");
const dmt_nodemailer_email_service_1 = require("../../common/services/email/dmt-nodemailer-email.service");
const jwt_utility_service_1 = require("../../common/services/jwt/jwt-utility.service");
const twilio_service_1 = require("../../common/services/twilio/twilio.service");
let AuthModule = class AuthModule {
};
exports.AuthModule = AuthModule;
exports.AuthModule = AuthModule = __decorate([
    (0, common_1.Module)({
        controllers: [auth_controller_1.AuthController],
        providers: [
            auth_service_1.AuthService,
            jwt_1.JwtService,
            nodemailer_email_service_1.default,
            users_service_1.UsersService,
            dmt_nodemailer_email_service_1.DmtNodemailerEmailService,
            jwt_utility_service_1.JwtUtilityService,
            twilio_service_1.TwilioService,
        ],
    })
], AuthModule);
//# sourceMappingURL=auth.module.js.map