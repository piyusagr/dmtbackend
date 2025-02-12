import { SesEmailService } from './ses-email.service';

export interface IEmailResponse {
  status: 'success' | 'failed' | 'fatal';
  message: string;
}

export interface EmailBody {
  text?: string;
  html?: string;
}

export abstract class IEmailService {
  abstract sendEmail(email: string, subject: string, body: EmailBody): any;

  abstract sendBulkEmail(emails: string[], subject: string, body: EmailBody): any;
}

export class EmailService implements IEmailService {
  constructor(private emailProvider: IEmailService, private developerEmail?: string) {
    this.emailProvider = emailProvider || new SesEmailService();
  }

  sendEmail<Response = IEmailResponse>(
    email: string,
    subject: string,
    body: EmailBody
  ): Promise<Response> {
    const response = this.emailProvider.sendEmail(email, subject, body);
    return response;
  }

  sendBulkEmail(emails: string[], subject: string, body: EmailBody) {
    return this.emailProvider.sendBulkEmail(emails, subject, body);
  }
}
