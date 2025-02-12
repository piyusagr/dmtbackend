import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtService } from '@nestjs/jwt';
import NodemailerEmailService from '../../common/services/email/nodemailer-email.service';
import { UsersService } from '../users/users.service';
import { DmtNodemailerEmailService } from '../../common/services/email/dmt-nodemailer-email.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtService,
    NodemailerEmailService,
    UsersService,
    DmtNodemailerEmailService,
    JwtUtilityService,
    TwilioService,
  ],
})
export class AuthModule {}
