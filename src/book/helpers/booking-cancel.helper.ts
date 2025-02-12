import { Logger } from '@nestjs/common';
import { Booking, BookingPolicy } from '@prisma/client';
import { throws } from 'assert';
import { DateTime } from 'luxon';
import { dateDifferenceFromNow, shortenDate } from '../../../helpers/date.helper';

interface PartialRefundOptions {
  /* Refund percentage in decimle form 0.5 = 50% || 1 = 100% */
  refundPercentage: number;
  allowPartialRefunds: boolean;
}

abstract class IBookingPolicyManager {
  /* Refund refund period in DAYS */
  abstract FULL_REFUND_PERIOD: number;

  abstract readonly booking: Booking;

  abstract PARTIAL_REFUND_OPTIONS: PartialRefundOptions;

  abstract isCancelable(): boolean;
  abstract refundAmount(): number;
}

export class CancellationPolicyManager implements IBookingPolicyManager {
  FULL_REFUND_PERIOD!: number;
  PARTIAL_REFUND_OPTIONS!: PartialRefundOptions;

  private readonly logger = new Logger(CancellationPolicyManager.name);

  constructor(public booking: Booking) {
    this.PARTIAL_REFUND_OPTIONS = {
      refundPercentage: 0.5,
      allowPartialRefunds: false
    };
  }

  isWithinFullRefundDate(): boolean {
    const difference = getDaysLeftUntilBooking(this.booking.start_date);
    const isWithinFullRefundDate = difference > this.FULL_REFUND_PERIOD;

    if (!isWithinFullRefundDate) {
      this.logger.verbose(`Is past full refund date`, {
        reason: 'CANCELLATION_DATE',
        now: shortenDate(new Date()),
        startDate: shortenDate(this.booking.start_date),
        daysUntilBooking: difference,
        policy: this.booking.policy,
        fullRefundPeriod: this.FULL_REFUND_PERIOD
      });
    }

    return isWithinFullRefundDate;
  }

  isCancelable(): boolean {
    if (this.PARTIAL_REFUND_OPTIONS.allowPartialRefunds) return true;

    return this.isWithinFullRefundDate();
  }

  refundAmount(): number {
    if (this.isWithinFullRefundDate()) return this.booking.total;
    if (this.isCancelable())
      return this.booking.total * this.PARTIAL_REFUND_OPTIONS.refundPercentage;

    return 0;
  }
}

export class FlexibleCancellationPolicyManager extends CancellationPolicyManager {
  FULL_REFUND_PERIOD: number;

  constructor(public booking: Booking) {
    super(booking);
    this.FULL_REFUND_PERIOD = 1;
  }
}

export class ModerateCancellationPolicyManager extends CancellationPolicyManager {
  FULL_REFUND_PERIOD: number;

  constructor(public booking: Booking) {
    super(booking);
    this.FULL_REFUND_PERIOD = 5;
    this.PARTIAL_REFUND_OPTIONS = {
      allowPartialRefunds: true,
      refundPercentage: 0.5
    };
  }
}

export class StrictCancellationPolicyManager extends CancellationPolicyManager {
  FULL_REFUND_PERIOD: number;
  PARTIAL_REFUND_OPTIONS: PartialRefundOptions;

  constructor(public booking: Booking) {
    super(booking);
    this.FULL_REFUND_PERIOD = 15;
    this.PARTIAL_REFUND_OPTIONS = {
      refundPercentage: 0.5,
      allowPartialRefunds: true
    };
  }

  isCancelable(): boolean {
    const difference = getDaysLeftUntilBooking(this.booking.start_date);
    const isAbleToCancel = this.FULL_REFUND_PERIOD < difference;

    const bookedDate = DateTime.fromJSDate(this.booking.createdAt);
    const bookingStartDate = DateTime.fromJSDate(this.booking.start_date);

    /* If the date booked was less then the FULL_REFUND_PERIOD */
    if (bookedDate.diff(bookingStartDate, ['days']).days < this.FULL_REFUND_PERIOD) {
      if (Math.abs(bookedDate.diffNow(['days']).days) < 2) return true;
    }

    return isAbleToCancel;
  }

  refundAmount(): number {
    if (this.isWithinFullRefundDate()) return this.booking.total;
    if (this.isCancelable())
      return this.booking.total * this.PARTIAL_REFUND_OPTIONS.refundPercentage;

    return 0;
  }
}

export class BookingCancellationService {
  policyManager: IBookingPolicyManager;

  constructor(private booking: Booking) {
    this.policyManager = this.getBookingPolicyManger(booking.policy);
  }

  getBookingPolicyManger(policy: BookingPolicy) {
    const policyMap = new Map<BookingPolicy, IBookingPolicyManager>();
    const DEFAULT_BOOKING_POLICY = new FlexibleCancellationPolicyManager(this.booking);

    policyMap.set(BookingPolicy.FLEXIBLE, DEFAULT_BOOKING_POLICY);

    policyMap.set(BookingPolicy.MODERATE, new ModerateCancellationPolicyManager(this.booking));

    policyMap.set(BookingPolicy.STRICT, new StrictCancellationPolicyManager(this.booking));

    return policyMap.get(policy) || DEFAULT_BOOKING_POLICY;
  }

  getDaysLeftUntilBooking() {
    const daysDiffrence = dateDifferenceFromNow(this.booking.start_date);

    return Math.round(daysDiffrence);
  }

  isCancelable(): boolean {
    return this.policyManager.isCancelable();
  }

  refundAmount(): number {
    return this.policyManager.refundAmount();
  }
}

/**
 * Currently abstracted out of the class because all BookingPolicyMangers need to use this.
 *
 * @param startDate - The start of the booking
 * @returns Days left until booking
 */
export const getDaysLeftUntilBooking = (startDate: Date) => {
  const daysDiffrence = dateDifferenceFromNow(startDate);

  return Math.round(daysDiffrence);
};
