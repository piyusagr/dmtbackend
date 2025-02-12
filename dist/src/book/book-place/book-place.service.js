"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookPlaceService = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const events_1 = require("../../../common/constants/events");
const api_error_1 = require("../../../common/errors/api.error");
const database_error_1 = require("../../../common/errors/database.error");
const stripe_service_1 = require("../../../common/services/stripe/stripe.service");
const db_1 = require("../../../config/db");
const number_helper_1 = require("../../../helpers/number.helper");
const places_service_1 = require("../../places/places.service");
const user_entity_1 = require("../../users/entities/user.entity");
const booking_cancel_helper_1 = require("../helpers/booking-cancel.helper");
const booking_helper_1 = require("../helpers/booking-helper");
const place_booked_event_1 = require("./events/place-booked.event");
let BookPlaceService = class BookPlaceService {
    constructor(placeService, eventEmitter) {
        this.placeService = placeService;
        this.eventEmitter = eventEmitter;
    }
    async bookPlace(placeId, bookPlaceDto, params) {
        const { end_date, start_date, room_ids } = bookPlaceDto;
        const place = (await this.placeService.findOne(placeId, {
            rooms: true,
            user: true,
        }));
        if (!place)
            throw new api_error_1.ApiError(`Place with id ${placeId} does not exsist.`);
        const manager = new booking_helper_1.BookingManager(new booking_helper_1.PlaceBookingCalculator({
            startDate: start_date,
            endDate: end_date,
            selectedRoomIds: room_ids,
            rooms: place.rooms,
        }));
        if (manager.bookingCalculator.hasInvalidPackage())
            throw new api_error_1.ApiError(`Booking contains rooms that are invalid or no longer exsist`);
        const booking = await db_1.default.booking.create({
            data: {
                start_date: bookPlaceDto.start_date,
                end_date: bookPlaceDto.end_date,
                total: manager.getBookingTotal(),
                place_id: placeId,
                buyer_id: params.buyer.id,
                seller_id: place.user_id,
            },
        });
        const placeBookedEvent = new place_booked_event_1.PlaceBookedEvent({
            buyer: new user_entity_1.UserEntity(params.buyer),
            seller: new user_entity_1.UserEntity(place.user),
            total: manager.getBookingTotal(),
            startDate: manager.bookingCalculator.startDate,
            endDate: manager.bookingCalculator.endDate,
            place: place,
        });
        this.eventEmitter.emit(events_1.EVENTS.booking.placeBooking, placeBookedEvent);
        await this.eventEmitter.emitAsync(events_1.EVENTS.booking.placeBookingPayment, placeBookedEvent);
        return booking;
    }
    async confirmBooking(bookingId) {
        const booking = await db_1.default.booking.findUnique({
            where: { id: bookingId },
            include: {
                buyer: true,
                seller: true,
                place: true,
            },
        });
        if (!booking)
            throw new api_error_1.ApiError(`Booking with id ${bookingId} does not exsist`);
        if (booking.status === 'COMPLETED' || booking.status == 'ACCEPTED')
            throw new api_error_1.ApiError('You can only confirm bookings that are in the pending status');
        if (!booking?.place)
            throw new api_error_1.ApiError('Booking is not attached to a valid place.');
        await this.updateBookingStatus(bookingId, 'ACCEPTED');
        const bookingEvent = new place_booked_event_1.PlaceBookedEvent({
            buyer: booking.buyer,
            seller: booking.seller,
            startDate: booking.start_date,
            endDate: booking.end_date,
            place: booking.place,
            total: booking.total,
        });
        this.eventEmitter.emit(events_1.EVENTS.booking.placeBookingConfirmed, bookingEvent);
        return booking;
    }
    async cancelBooking(bookingId) {
        try {
            const booking = await db_1.default.booking.findUniqueOrThrow({
                where: { id: bookingId },
            });
            if (booking.status !== 'ACCEPTED')
                throw new api_error_1.ApiError('You can only cancel bookings that are accepted.');
            if (new Date().getTime() > booking.start_date.getTime())
                throw new api_error_1.ApiError('You cannot cancel a booking that has already started');
            const cancelationManager = new booking_cancel_helper_1.BookingCancellationService(booking);
            if (!cancelationManager.isCancelable())
                throw new api_error_1.ApiError('This booking cannot be cancelled due to cancellation policy');
            return cancelationManager.refundAmount();
        }
        catch (error) {
            if (error instanceof api_error_1.ApiError)
                throw error;
            throw new database_error_1.DatabseError(error);
        }
    }
    async updateBookingStatus(bookingId, status) {
        const booking = await db_1.default.booking.update({
            where: { id: bookingId },
            data: {
                status,
            },
        });
        return booking;
    }
    async getBookingsForBuyer(buyerId) {
        try {
            return db_1.default.booking.findMany({
                where: { buyer_id: buyerId },
                include: { place: true },
            });
        }
        catch (e) {
            console.log(e);
            return Promise.reject(e);
        }
    }
    async testPayment() {
        const transfer = await stripe_service_1.stripe.transfers.create({
            amount: (0, number_helper_1.dollarsToCents)(10),
            currency: 'usd',
            destination: 'acct_1LOqMv2EJYxBIpbv',
            description: 'Seller accepted booking',
        });
        return transfer;
    }
};
exports.BookPlaceService = BookPlaceService;
exports.BookPlaceService = BookPlaceService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [places_service_1.PlacesService,
        event_emitter_1.EventEmitter2])
], BookPlaceService);
//# sourceMappingURL=book-place.service.js.map