"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const exepection_handler_filter_1 = require("../common/filters/exepection-handler.filter");
const configuration_1 = require("../config/configuration");
const auth_module_1 = require("./auth/auth.module");
const events_module_1 = require("./events/events.module");
const book_place_module_1 = require("./book/book-place/book-place.module");
const places_module_1 = require("./places/places.module");
const reviews_module_1 = require("./reviews/reviews.module");
const rooms_module_1 = require("./rooms/rooms.module");
const users_module_1 = require("./users/users.module");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const event_reviews_module_1 = require("./event-reviews/event-reviews.module");
const payment_module_1 = require("./payment/payment.module");
const event_buyer_history_module_1 = require("./event-buyer-history/event-buyer-history.module");
const Joi = require("joi");
const place_buyer_history_module_1 = require("./places-buyer-history/place-buyer-history.module");
const event_booster_buyer_history_module_1 = require("./event-booster-buyer-history/event-booster-buyer-history.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            rooms_module_1.RoomsModule,
            places_module_1.PlacesModule,
            auth_module_1.AuthModule,
            book_place_module_1.BookPlaceModule,
            events_module_1.EventsModule,
            reviews_module_1.ReviewsModule,
            event_reviews_module_1.EventReviewsModule,
            users_module_1.UsersModule,
            event_emitter_1.EventEmitterModule.forRoot(),
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env.development.local', '.env.development', '.env'],
                isGlobal: true,
                cache: true,
                validate: configuration_1.validateEnv,
                validationOptions: {
                    abortEarly: true,
                },
                load: [configuration_1.default],
            }),
            config_1.ConfigModule.forRoot({
                validationSchema: Joi.object({
                    PORT: Joi.number().required(),
                    DATABASE_URL: Joi.string().required(),
                    JWT_VERIFICATION_TOKEN_SECRET: Joi.string().required(),
                    JWT_VERIFICATION_TOKEN_EXPIRATION_TIME: Joi.string().required(),
                    EMAIL_SERVICE: Joi.string().required(),
                    EMAIL_USER: Joi.string().required(),
                    EMAIL_PASSWORD: Joi.string().required(),
                    EMAIL_CONFIRMATION_URL: Joi.string().required(),
                }),
            }),
            payment_module_1.PaymentModule,
            event_buyer_history_module_1.EventBuyerHistoryModule,
            place_buyer_history_module_1.PlaceBuyerHistoryModule,
            event_booster_buyer_history_module_1.EventBoosterBuyerHistoryModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [
            app_service_1.AppService,
            { provide: core_1.APP_FILTER, useClass: exepection_handler_filter_1.HttpExecptionFilter },
            { provide: core_1.APP_INTERCEPTOR, useClass: common_1.ClassSerializerInterceptor },
            {
                provide: core_1.APP_PIPE,
                useValue: new common_1.ValidationPipe({
                    forbidNonWhitelisted: true,
                    whitelist: true,
                }),
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map