import {
  ClassSerializerInterceptor,
  Module,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HttpExecptionFilter } from '../common/filters/exepection-handler.filter';
import configuration, { validateEnv } from '../config/configuration';
import { AuthModule } from './auth/auth.module';
import { EventsModule } from './events/events.module';
import { BookPlaceModule } from './book/book-place/book-place.module';
import { PlacesModule } from './places/places.module';
import { ReviewsModule } from './reviews/reviews.module';
import { RoomsModule } from './rooms/rooms.module';
import { UsersModule } from './users/users.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventReviewsModule } from './event-reviews/event-reviews.module';
import { PaymentModule } from './payment/payment.module';
import { EventBuyerHistoryModule } from './event-buyer-history/event-buyer-history.module';
import * as Joi from 'joi';
import { PlaceBuyerHistoryModule } from './places-buyer-history/place-buyer-history.module';
import { EventBoosterBuyerHistoryModule } from './event-booster-buyer-history/event-booster-buyer-history.module';

@Module({
  imports: [
    RoomsModule,
    PlacesModule,
    AuthModule,
    BookPlaceModule,
    EventsModule,
    ReviewsModule,
    EventReviewsModule,
    UsersModule,
    EventEmitterModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env.development.local', '.env.development', '.env'],
      isGlobal: true,
      cache: true,
      validate: validateEnv,
      validationOptions: {
        abortEarly: true,
      },
      load: [configuration],
    }),
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        PORT: Joi.number().required(),
        DATABASE_URL: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
        JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
        EMAIL_SERVICE: Joi.string().required(),
        EMAIL_USER: Joi.string().required(),
        EMAIL_PASSWORD: Joi.string().required(),
        EMAIL_CONFIRMATION_URL: Joi.string().required(),
        // GOOGLE_AUTH_CLIENT_ID: Joi.string().required(),
        // GOOGLE_AUTH_CLIENT_SECRET: Joi.string().required(),
        // AWS_REGION: Joi.string().required(),
        // CONTABO_ACCESS_KEY_ID: Joi.string().required(),
        // CONTABO_SECRET_ACCESS_KEY: Joi.string().required(),
        // CONTABO_BUCKET_NAME: Joi.string().required(),
        // TWILIO_ACCOUNT_SID: Joi.string().required(),
        // TWILIO_AUTH_TOKEN: Joi.string().required(),
        // TWILIO_VERIFICATION_SERVICE_SID: Joi.string().required(),
      }),
    }),
    PaymentModule,
    EventBuyerHistoryModule,
    PlaceBuyerHistoryModule,
    EventBoosterBuyerHistoryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_FILTER, useClass: HttpExecptionFilter },
    { provide: APP_INTERCEPTOR, useClass: ClassSerializerInterceptor },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        forbidNonWhitelisted: true,
        whitelist: true,
      }),
    },
  ],
})
export class AppModule {}
