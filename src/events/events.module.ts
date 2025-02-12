import { Module } from '@nestjs/common';
import { EventsService } from './events.service';
import { EventsController } from './events.controller';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';
import { ImageService } from '../../common/services/images/image.service';

@Module({
  controllers: [EventsController],
  providers: [
    EventsService,
    JwtService,
    JwtUtilityService,
    UsersService,
    TwilioService,
    ImageService,
  ],
  exports: [EventsService],
})
export class EventsModule {}
