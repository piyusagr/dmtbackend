"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = exports.IEmailService = void 0;
const ses_email_service_1 = require("./ses-email.service");
class IEmailService {
}
exports.IEmailService = IEmailService;
class EmailService {
    constructor(emailProvider, developerEmail) {
        this.emailProvider = emailProvider;
        this.developerEmail = developerEmail;
        this.emailProvider = emailProvider || new ses_email_service_1.SesEmailService();
    }
    sendEmail(email, subject, body) {
        const response = this.emailProvider.sendEmail(email, subject, body);
        return response;
    }
    sendBulkEmail(emails, subject, body) {
        return this.emailProvider.sendBulkEmail(emails, subject, body);
    }
}
exports.EmailService = EmailService;
//# sourceMappingURL=email.service.js.map