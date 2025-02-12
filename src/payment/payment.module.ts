import { Module, forwardRef } from '@nestjs/common';
import { PaymentService } from './service/payment.service';
import { PaymentController } from './payment.controller';
import { EventsModule } from 'src/events/events.module';
import { PaymentRepository } from './payment.repository';
import { JwtUtilityService } from 'common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PlacesModule } from 'src/places/places.module';
import { PlaceBuyerHistoryModule } from 'src/places-buyer-history/place-buyer-history.module';
import { EventBoosterBuyerHistoryModule } from 'src/event-booster-buyer-history/event-booster-buyer-history.module';
import { EventBuyerHistoryModule } from 'src/event-buyer-history/event-buyer-history.module';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [PaymentController],
  providers: [
    PaymentService,
    PaymentRepository,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
  imports: [
    EventsModule,
    PlacesModule,
    forwardRef(() => PlaceBuyerHistoryModule),
    forwardRef(() => EventBuyerHistoryModule),
    forwardRef(() => EventBoosterBuyerHistoryModule),
  ],
  exports: [PaymentService],
})
export class PaymentModule {
}
