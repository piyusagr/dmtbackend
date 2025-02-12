import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Twilio } from 'twilio';

@Injectable()
export class TwilioService {
  private twilioClient: Twilio;

  constructor(private readonly configService: ConfigService) {
    const accountSid = configService.get('TWILIO_ACCOUNT_SID');
    const authToken = configService.get('TWILIO_AUTH_TOKEN');

    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async initiatePhoneNumberVerification(phoneNumber: string) {
    try {
      const serviceSid = this.configService.get(
        'TWILIO_VERIFICATION_SERVICE_SID',
      );

      return await this.twilioClient.verify.v2
        .services(serviceSid)
        .verifications.create({ to: `${phoneNumber}`, channel: 'whatsapp' });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async confirmPhoneNumber(phoneNumber: string, verificationCode: string) {
    try {
      const serviceSid = this.configService.get(
        'TWILIO_VERIFICATION_SERVICE_SID',
      );

      return await this.twilioClient.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to: phoneNumber, code: verificationCode });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }
}
