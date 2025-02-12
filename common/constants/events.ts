export const BOOKING_EVENTS = {
  placeBooking: 'place.booking',
  placeBookingPayment: "place.booking:payment",
  placeBookingConfirmed: "place.booking:confirmed"
};

export const REVIEW_EVENTS = {
  placeReviewAggregate: "review.place:created",
}

export const EVENTS = {
  booking: BOOKING_EVENTS,
  review: REVIEW_EVENTS
};
