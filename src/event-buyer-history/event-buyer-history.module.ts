import { Module, forwardRef } from '@nestjs/common';
import { EventBuyerHistoryService } from './event-buyer-history.service';
import { EventBuyerHistoryController } from './event-buyer-history.controller';
import { EventBuyerHistoryRepository } from './event-buyer-history.repository';
import { JwtUtilityService } from 'common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PaymentModule } from 'src/payment/payment.module';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [EventBuyerHistoryController],
  providers: [
    EventBuyerHistoryService,
    EventBuyerHistoryRepository,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
  imports: [forwardRef(() => PaymentModule)],
  exports: [EventBuyerHistoryService],
})
export class EventBuyerHistoryModule {}
