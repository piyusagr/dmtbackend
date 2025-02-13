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
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const nodemailer_1 = require("nodemailer");
const config_1 = require("@nestjs/config");
let NodemailerEmailService = class NodemailerEmailService {
    constructor(configService) {
        this.configService = configService;
        this.nodemailerTransport = (0, nodemailer_1.createTransport)({
            service: this.configService.get('EMAIL_SERVICE'),
            auth: {
                user: this.configService.get('EMAIL_USER'),
                pass: this.configService.get('EMAIL_PASSWORD'),
            },
        });
    }
    async sendMail(options) {
        try {
            return await this.nodemailerTransport.sendMail(options);
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
};
NodemailerEmailService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], NodemailerEmailService);
exports.default = NodemailerEmailService;
//# sourceMappingURL=nodemailer-email.service.js.map