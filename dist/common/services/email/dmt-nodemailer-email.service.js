"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var DmtNodemailerEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DmtNodemailerEmailService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const nodemailer_email_service_1 = require("./nodemailer-email.service");
const jwt_utility_service_1 = require("../jwt/jwt-utility.service");
let DmtNodemailerEmailService = DmtNodemailerEmailService_1 = class DmtNodemailerEmailService {
    constructor(jwtUtilityService, configService, nodemailerEmailService) {
        this.jwtUtilityService = jwtUtilityService;
        this.configService = configService;
        this.nodemailerEmailService = nodemailerEmailService;
        this.logger = new common_1.Logger(DmtNodemailerEmailService_1.name);
    }
    async sendWelcomeEmail(email) {
        try {
            const text = `Welcome to the DMT Tourism.`;
            return await this.nodemailerEmailService.sendMail({
                from: this.configService.get('EMAIL_USER'),
                to: email,
                subject: 'DMT Tourism - Welcome Email',
                text,
            });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async sendVerificationLink(email) {
        try {
            const payload = { email };
            const token = await this.jwtUtilityService.sign(payload);
            const url = `${this.configService.get('EMAIL_CONFIRMATION_URL')}?user=${email}&token=${token}`;
            const text = `Welcome to the DMT Tourism. To confirm the email address, click here: ${url}`;
            const result = await this.nodemailerEmailService.sendMail({
                from: this.configService.get('EMAIL_USER'),
                to: email,
                subject: 'DMT Tourism - Email confirmation',
                text,
            });
            this.logger.log(`sendVerificationLink - result : ${JSON.stringify(result)}`);
            return token;
        }
        catch (e) {
            this.logger.error(e);
            return Promise.reject(e);
        }
    }
    async sendResetPasswordEmail(email) {
        try {
            const payload = { email };
            const token = await this.jwtUtilityService.sign(payload);
            const url = `${this.configService.get('RESET_PASSWORD_URL')}?token=${token}`;
            const text = `Forgot your password?. We received a request to reset the password for your account. To reset your password, click here: ${url}`;
            const result = await this.nodemailerEmailService.sendMail({
                from: this.configService.get('EMAIL_USER'),
                to: email,
                subject: 'DMT Tourism - Reset password',
                text,
            });
            this.logger.log(`sendResetPasswordEmail - result : ${JSON.stringify(result)}`);
            return token;
        }
        catch (e) {
            this.logger.error(e);
            return Promise.reject(e);
        }
    }
};
exports.DmtNodemailerEmailService = DmtNodemailerEmailService;
exports.DmtNodemailerEmailService = DmtNodemailerEmailService = DmtNodemailerEmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_utility_service_1.JwtUtilityService,
        config_1.ConfigService,
        nodemailer_email_service_1.default])
], DmtNodemailerEmailService);
//# sourceMappingURL=dmt-nodemailer-email.service.js.map