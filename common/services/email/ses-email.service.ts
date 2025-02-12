import {
  SendEmailCommand,
  SendEmailCommandInput,
  SESClient,
  SESServiceException,
} from '@aws-sdk/client-ses';
import { Injectable, Logger } from '@nestjs/common';
import { EmailBody, IEmailResponse, IEmailService } from './email.service';

@Injectable()
export class SesEmailService implements IEmailService {
  private logger = new Logger(SesEmailService.name);
  private client = new SESClient({ region: 'us-east-1' });

  constructor(public readonly sender?: string) {
    this.sender = 'adam@webrevived.com';
  }

  sendEmail(email: string, subject: string, body: EmailBody) {
    this.logger.debug(`Sending single email to email: ${email}`);
    return this.sendSesEmail([email], subject, body);
  }

  sendBulkEmail(emails: string[], subject: string, body: EmailBody) {
    this.logger.debug(`Send email to ${emails.toString()}`);
    return this.sendSesEmail(emails, subject, body);
  }

  private async sendSesEmail(
    toAddress: string[],
    subject: string,
    body: EmailBody
  ) {
    const commandInput: SendEmailCommandInput = {
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
      const command = new SendEmailCommand(commandInput);
      const response = await this.client.send(command);

      return response;
    } catch (error) {
      if (error instanceof SESServiceException) {
        console.debug(`Failed to send email to ${toAddress.toString()}.`, {
          requestID: error.$metadata.requestId,
        });
        return;
      }

      this.logger.error(`Failed to send email to ${toAddress.toString()}`);
    }
  }
}
