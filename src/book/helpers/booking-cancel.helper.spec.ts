import { EventEmitter2, EventEmitterModule } from '@nestjs/event-emitter';
import { Test, TestingModule } from '@nestjs/testing';
import { Booking } from '@prisma/client';
import { DateTime } from 'luxon';
import { EmailService } from '../../../common/services/email/email.service';
import { PlacesService } from '../../places/places.service';
import { BookingCancellationService } from './booking-cancel.helper';

const DEFAULT_BOOKING_DATA = {
  buyer_id: 1,
  expierence_id: 1,
  id: 1,
  place_id: 1,
  policy: 'FLEXIBLE',
  seller_id: 1,
  status: 'ACCEPTED',
  total: 100
} as Booking;

describe('BookPlaceController', () => {
  const flexableBookingValid = new BookingCancellationService({
    ...DEFAULT_BOOKING_DATA,
    policy: 'FLEXIBLE',
    createdAt: DateTime.now().toJSDate(),
    start_date: DateTime.now().plus({ days: 2 }).toJSDate(),
    end_date: DateTime.now().minus({ days: 5 }).toJSDate()
  });
  const flexableBookingInvalid = new BookingCancellationService({
    ...DEFAULT_BOOKING_DATA,
    policy: 'FLEXIBLE',
    createdAt: DateTime.now().toJSDate(),
    start_date: DateTime.now().plus({ days: 1 }).toJSDate(),
    end_date: DateTime.now().minus({ days: 5 }).toJSDate()
  });

  const moderateBookingInvalid = new BookingCancellationService({
    ...DEFAULT_BOOKING_DATA,
    policy: 'MODERATE',
    createdAt: DateTime.now().toJSDate(),
    start_date: DateTime.now().plus({ days: 4 }).toJSDate(),
    end_date: DateTime.now().minus({ days: 6 }).toJSDate()
  });
  const moderateBookingValid = new BookingCancellationService({
    ...DEFAULT_BOOKING_DATA,
    policy: 'MODERATE',
    createdAt: DateTime.now().toJSDate(),
    start_date: DateTime.now().plus({ days: 6 }).toJSDate(),
    end_date: DateTime.now().minus({ days: 5 }).toJSDate()
  });

  describe('when given a VALID FLEXIBLE booking', () => {
    it('should be cancelable and return true', () => {
      expect(flexableBookingValid.isCancelable()).toBe(true);
    });

    it(`should return full amount [${DEFAULT_BOOKING_DATA.total}]`, () => {
      expect(flexableBookingValid.refundAmount()).toEqual(DEFAULT_BOOKING_DATA.total);
    });
  });

  describe('when given an INVALID FLEXIBLE booking', () => {
    it('should not be cancelable and return false', () => {
      expect(flexableBookingInvalid.isCancelable()).toEqual(false);
    });

    it('should return no refund amount [$0]', () => {
      expect(flexableBookingInvalid.refundAmount()).toEqual(0);
    });
  });

  /* VALID MODERATE BOOKING */
  describe('when given a MODERATE booking PAST FULL REFUND', () => {
    it('should be cancelable for partail refund and return true', () => {
      expect(moderateBookingInvalid.isCancelable()).toBe(true);
    });

    const moderateBookingPartialRefundAmount =
      DEFAULT_BOOKING_DATA.total *
      moderateBookingInvalid.policyManager.PARTIAL_REFUND_OPTIONS.refundPercentage;

    it(`should return partial amount [${moderateBookingPartialRefundAmount}]`, () => {
      expect(moderateBookingInvalid.refundAmount()).toEqual(moderateBookingPartialRefundAmount);
    });
  });

  /* INVALID MODERATE BOOKING */
  describe('when given an VALID MODERATE booking WITHIN FULL REFUND', () => {
    it('should be cancelable return true', () => {
      expect(moderateBookingValid.isCancelable()).toEqual(true);
    });

    it(`should return FULL REFUND AMOUNT [${DEFAULT_BOOKING_DATA.total}]`, () => {
      expect(moderateBookingValid.refundAmount()).toEqual(DEFAULT_BOOKING_DATA.total);
    });
  });
});
