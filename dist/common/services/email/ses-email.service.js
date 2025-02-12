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
var SesEmailService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SesEmailService = void 0;
const client_ses_1 = require("@aws-sdk/client-ses");
const common_1 = require("@nestjs/common");
let SesEmailService = SesEmailService_1 = class SesEmailService {
    constructor(sender) {
        this.sender = sender;
        this.logger = new common_1.Logger(SesEmailService_1.name);
        this.client = new client_ses_1.SESClient({ region: 'us-east-1' });
        this.sender = 'adam@webrevived.com';
    }
    sendEmail(email, subject, body) {
        this.logger.debug(`Sending single email to email: ${email}`);
        return this.sendSesEmail([email], subject, body);
    }
    sendBulkEmail(emails, subject, body) {
        this.logger.debug(`Send email to ${emails.toString()}`);
        return this.sendSesEmail(emails, subject, body);
    }
    async sendSesEmail(toAddress, subject, body) {
        const commandInput = {
            Destination: {
                ToAddresses: toAddress,
            },
            Message: {
                Body: {
                    Text: {
                        Data: body.text,
                    },
                    Html: {
                        Data: body.html,
                    },
                },
                Subject: {
                    Data: subject,
                },
            },
            Source: this.sender,
        };
        try {
            const command = new client_ses_1.SendEmailCommand(commandInput);
            const response = await this.client.send(command);
            return response;
        }
        catch (error) {
            if (error instanceof client_ses_1.SESServiceException) {
                console.debug(`Failed to send email to ${toAddress.toString()}.`, {
                    requestID: error.$metadata.requestId,
                });
                return;
            }
            this.logger.error(`Failed to send email to ${toAddress.toString()}`);
        }
    }
};
exports.SesEmailService = SesEmailService;
exports.SesEmailService = SesEmailService = SesEmailService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [String])
], SesEmailService);
//# sourceMappingURL=ses-email.service.js.map