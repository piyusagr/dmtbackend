"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EVENTS = exports.REVIEW_EVENTS = exports.BOOKING_EVENTS = void 0;
exports.BOOKING_EVENTS = {
    placeBooking: 'place.booking',
    placeBookingPayment: "place.booking:payment",
    placeBookingConfirmed: "place.booking:confirmed"
};
exports.REVIEW_EVENTS = {
    placeReviewAggregate: "review.place:created",
};
exports.EVENTS = {
    booking: exports.BOOKING_EVENTS,
    review: exports.REVIEW_EVENTS
};
//# sourceMappingURL=events.js.map