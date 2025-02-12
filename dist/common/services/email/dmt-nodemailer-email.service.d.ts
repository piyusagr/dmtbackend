import { ConfigService } from '@nestjs/config';
import NodemailerEmailService from './nodemailer-email.service';
import { JwtUtilityService } from '../jwt/jwt-utility.service';
export declare class DmtNodemailerEmailService {
    private readonly jwtUtilityService;
    private readonly configService;
    private readonly nodemailerEmailService;
    private logger;
    constructor(jwtUtilityService: JwtUtilityService, configService: ConfigService, nodemailerEmailService: NodemailerEmailService);
    sendWelcomeEmail(email: string): Promise<any>;
    sendVerificationLink(email: string): Promise<string>;
    sendResetPasswordEmail(email: string): Promise<string>;
}
