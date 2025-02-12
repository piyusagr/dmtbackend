import { EmailBody, IEmailService } from './email.service';
export declare class SesEmailService implements IEmailService {
    readonly sender?: string;
    private logger;
    private client;
    constructor(sender?: string);
    sendEmail(email: string, subject: string, body: EmailBody): Promise<import("@aws-sdk/client-ses").SendEmailCommandOutput>;
    sendBulkEmail(emails: string[], subject: string, body: EmailBody): Promise<import("@aws-sdk/client-ses").SendEmailCommandOutput>;
    private sendSesEmail;
}
