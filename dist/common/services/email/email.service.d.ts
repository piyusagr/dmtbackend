export interface IEmailResponse {
    status: 'success' | 'failed' | 'fatal';
    message: string;
}
export interface EmailBody {
    text?: string;
    html?: string;
}
export declare abstract class IEmailService {
    abstract sendEmail(email: string, subject: string, body: EmailBody): any;
    abstract sendBulkEmail(emails: string[], subject: string, body: EmailBody): any;
}
export declare class EmailService implements IEmailService {
    private emailProvider;
    private developerEmail?;
    constructor(emailProvider: IEmailService, developerEmail?: string);
    sendEmail<Response = IEmailResponse>(email: string, subject: string, body: EmailBody): Promise<Response>;
    sendBulkEmail(emails: string[], subject: string, body: EmailBody): any;
}
