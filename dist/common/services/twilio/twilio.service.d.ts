import { ConfigService } from '@nestjs/config';
export declare class TwilioService {
    private readonly configService;
    private twilioClient;
    constructor(configService: ConfigService);
    initiatePhoneNumberVerification(phoneNumber: string): Promise<import("twilio/lib/rest/verify/v2/service/verification").VerificationInstance>;
    confirmPhoneNumber(phoneNumber: string, verificationCode: string): Promise<import("twilio/lib/rest/verify/v2/service/verificationCheck").VerificationCheckInstance>;
}
