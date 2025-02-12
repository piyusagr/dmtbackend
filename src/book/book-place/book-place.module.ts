import { Module } from '@nestjs/common';
import { BookPlaceService } from './book-place.service';
import { BookPlaceController } from './book-place.controller';
import { EmailService } from '../../../common/services/email/email.service';
import { PlacesService } from '../../places/places.service';
import { PlaceBookedListener } from './listeners/place-booked.listener';
import { PlaceBookingConfirmedListener } from './listeners/place-booking-confirmed.listener';
import { ImageService } from '../../../common/services/images/image.service';
import { JwtUtilityService } from '../../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../../users/users.service';
import { TwilioService } from '../../../common/services/twilio/twilio.service';

@Module({
  controllers: [BookPlaceController],
  providers: [
    BookPlaceService,
    EmailService,
    PlacesService,
    ImageService,
    PlaceBookedListener,
    PlaceBookingConfirmedListener,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
})
export class BookPlaceModule {}
