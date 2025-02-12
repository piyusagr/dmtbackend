import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import NodemailerEmailService from './nodemailer-email.service';
import { JwtUtilityService } from '../jwt/jwt-utility.service';

@Injectable()
export class DmtNodemailerEmailService {
  private logger = new Logger(DmtNodemailerEmailService.name);

  constructor(
    private readonly jwtUtilityService: JwtUtilityService,
    private readonly configService: ConfigService,
    private readonly nodemailerEmailService: NodemailerEmailService,
  ) {}

  async sendWelcomeEmail(email: string) {
    try {
      const text = `Welcome to the DMT Tourism.`;

      return await this.nodemailerEmailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'DMT Tourism - Welcome Email',
        text,
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async sendVerificationLink(email: string) {
    try {
      const payload: any = { email };

      const token = await this.jwtUtilityService.sign(payload);

      const url = `${this.configService.get(
        'EMAIL_CONFIRMATION_URL',
      )}?user=${email}&token=${token}`;

      const text = `Welcome to the DMT Tourism. To confirm the email address, click here: ${url}`;

      const result = await this.nodemailerEmailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'DMT Tourism - Email confirmation',
        text,
      });

      this.logger.log(
        `sendVerificationLink - result : ${JSON.stringify(result)}`,
      );

      return token;
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }

  async sendResetPasswordEmail(email: string) {
    try {
      const payload: any = { email };

      const token = await this.jwtUtilityService.sign(payload);

      const url = `${this.configService.get(
        'RESET_PASSWORD_URL',
      )}?token=${token}`;

      const text = `Forgot your password?. We received a request to reset the password for your account. To reset your password, click here: ${url}`;

      const result = await this.nodemailerEmailService.sendMail({
        from: this.configService.get('EMAIL_USER'),
        to: email,
        subject: 'DMT Tourism - Reset password',
        text,
      });

      this.logger.log(
        `sendResetPasswordEmail - result : ${JSON.stringify(result)}`,
      );

      return token;
    } catch (e) {
      this.logger.error(e);
      return Promise.reject(e);
    }
  }
}
