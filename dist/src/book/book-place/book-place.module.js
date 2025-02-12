"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookPlaceModule = void 0;
const common_1 = require("@nestjs/common");
const book_place_service_1 = require("./book-place.service");
const book_place_controller_1 = require("./book-place.controller");
const email_service_1 = require("../../../common/services/email/email.service");
const places_service_1 = require("../../places/places.service");
const place_booked_listener_1 = require("./listeners/place-booked.listener");
const place_booking_confirmed_listener_1 = require("./listeners/place-booking-confirmed.listener");
const image_service_1 = require("../../../common/services/images/image.service");
const jwt_utility_service_1 = require("../../../common/services/jwt/jwt-utility.service");
const jwt_1 = require("@nestjs/jwt");
const users_service_1 = require("../../users/users.service");
const twilio_service_1 = require("../../../common/services/twilio/twilio.service");
let BookPlaceModule = class BookPlaceModule {
};
exports.BookPlaceModule = BookPlaceModule;
exports.BookPlaceModule = BookPlaceModule = __decorate([
    (0, common_1.Module)({
        controllers: [book_place_controller_1.BookPlaceController],
        providers: [
            book_place_service_1.BookPlaceService,
            email_service_1.EmailService,
            places_service_1.PlacesService,
            image_service_1.ImageService,
            place_booked_listener_1.PlaceBookedListener,
            place_booking_confirmed_listener_1.PlaceBookingConfirmedListener,
            jwt_utility_service_1.JwtUtilityService,
            jwt_1.JwtService,
            users_service_1.UsersService,
            twilio_service_1.TwilioService,
        ],
    })
], BookPlaceModule);
//# sourceMappingURL=book-place.module.js.map