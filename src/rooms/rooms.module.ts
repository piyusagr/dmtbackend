import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { CaslAbilityFactory } from '../../common/auth/casl-ability.factory';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Module({
  controllers: [RoomsController],
  providers: [
    RoomsService,
    CaslAbilityFactory,
    JwtUtilityService,
    JwtService,
    UsersService,
    TwilioService,
  ],
})
export class RoomsModule {}
