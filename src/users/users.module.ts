import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PlacesService } from '../places/places.service';
import { ImageService } from '../../common/services/images/image.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    PlacesService,
    ImageService,
    JwtUtilityService,
    JwtService,
    TwilioService,
  ],
})
export class UsersModule {}
