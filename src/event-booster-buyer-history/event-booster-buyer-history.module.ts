import { Module, forwardRef } from '@nestjs/common';
import { EventBoosterBuyerHistoryService } from './event-booster-buyer-history.service';
import { EventBoosterBuyerHistoryController } from './event-booster-buyer-history.controller';
import { EventBoosterBuyerHistoryRepository } from './event-booster-buyer-history.repository';
import { JwtUtilityService } from 'common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PaymentModule } from 'src/payment/payment.module';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [EventBoosterBuyerHistoryController],
  providers: [
    EventBoosterBuyerHistoryService,
    EventBoosterBuyerHistoryRepository,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
  imports: [forwardRef(() => PaymentModule)],
  exports: [EventBoosterBuyerHistoryService],
})
export class EventBoosterBuyerHistoryModule {}
