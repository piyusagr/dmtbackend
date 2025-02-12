import { Module } from '@nestjs/common';
import { EventReviewsController } from './event-reviews.controller';
import { EventReviewsService } from './event-reviews.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [EventReviewsController],
  providers: [
    EventReviewsService,
    JwtService,
    JwtUtilityService,
    UsersService,
    TwilioService,
  ],
})
export class EventReviewsModule {}
