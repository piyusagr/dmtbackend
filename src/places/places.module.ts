import { Module } from '@nestjs/common';
import { EmailService } from '../../common/services/email/email.service';
import { ImageService } from '../../common/services/images/image.service';
import { PlacesController } from './places.controller';
import { PlacesService } from './places.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [PlacesController],
  providers: [
    ImageService,
    PlacesService,
    EmailService,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
  exports: [PlacesService],
})
export class PlacesModule {}
