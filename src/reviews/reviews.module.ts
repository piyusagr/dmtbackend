import { Module } from '@nestjs/common';
import { ReviewsService } from './reviews.service';
import { ReviewsController } from './reviews.controller';
import { PlacesService } from '../places/places.service';
import { ReviewAggregateListner } from './listeners/review-aggregate.listener';
import { ImageService } from '../../common/services/images/image.service';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [ReviewsController],
  providers: [
    ReviewsService,
    PlacesService,
    ReviewAggregateListner,
    ImageService,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
})
export class ReviewsModule {}
