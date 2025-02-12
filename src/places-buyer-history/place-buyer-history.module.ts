import { Module, forwardRef } from '@nestjs/common';
import { JwtUtilityService } from 'common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PlaceBuyerHistoryController } from './place-buyer-history.controller';
import { PlaceBuyerHistoryService } from './place-buyer-history.service';
import { PlaceBuyerHistoryRepository } from './place-buyer-history.repository';
import { PaymentModule } from 'src/payment/payment.module';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [PlaceBuyerHistoryController],
  providers: [
    PlaceBuyerHistoryService,
    PlaceBuyerHistoryRepository,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
  imports: [forwardRef(() => PaymentModule)],
  exports: [PlaceBuyerHistoryService],
})
export class PlaceBuyerHistoryModule {}
