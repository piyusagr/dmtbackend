"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDaysLeftUntilBooking = exports.BookingCancellationService = exports.StrictCancellationPolicyManager = exports.ModerateCancellationPolicyManager = exports.FlexibleCancellationPolicyManager = exports.CancellationPolicyManager = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const luxon_1 = require("luxon");
const date_helper_1 = require("../../../helpers/date.helper");
class IBookingPolicyManager {
}
class CancellationPolicyManager {
    constructor(booking) {
        this.booking = booking;
        this.logger = new common_1.Logger(CancellationPolicyManager.name);
        this.PARTIAL_REFUND_OPTIONS = {
            refundPercentage: 0.5,
            allowPartialRefunds: false
        };
    }
    isWithinFullRefundDate() {
        const difference = (0, exports.getDaysLeftUntilBooking)(this.booking.start_date);
        const isWithinFullRefundDate = difference > this.FULL_REFUND_PERIOD;
        if (!isWithinFullRefundDate) {
            this.logger.verbose(`Is past full refund date`, {
                reason: 'CANCELLATION_DATE',
                now: (0, date_helper_1.shortenDate)(new Date()),
                startDate: (0, date_helper_1.shortenDate)(this.booking.start_date),
                daysUntilBooking: difference,
                policy: this.booking.policy,
                fullRefundPeriod: this.FULL_REFUND_PERIOD
            });
        }
        return isWithinFullRefundDate;
    }
    isCancelable() {
        if (this.PARTIAL_REFUND_OPTIONS.allowPartialRefunds)
            return true;
        return this.isWithinFullRefundDate();
    }
    refundAmount() {
        if (this.isWithinFullRefundDate())
            return this.booking.total;
        if (this.isCancelable())
            return this.booking.total * this.PARTIAL_REFUND_OPTIONS.refundPercentage;
        return 0;
    }
}
exports.CancellationPolicyManager = CancellationPolicyManager;
class FlexibleCancellationPolicyManager extends CancellationPolicyManager {
    constructor(booking) {
        super(booking);
        this.booking = booking;
        this.FULL_REFUND_PERIOD = 1;
    }
}
exports.FlexibleCancellationPolicyManager = FlexibleCancellationPolicyManager;
class ModerateCancellationPolicyManager extends CancellationPolicyManager {
    constructor(booking) {
        super(booking);
        this.booking = booking;
        this.FULL_REFUND_PERIOD = 5;
        this.PARTIAL_REFUND_OPTIONS = {
            allowPartialRefunds: true,
            refundPercentage: 0.5
        };
    }
}
exports.ModerateCancellationPolicyManager = ModerateCancellationPolicyManager;
class StrictCancellationPolicyManager extends CancellationPolicyManager {
    constructor(booking) {
        super(booking);
        this.booking = booking;
        this.FULL_REFUND_PERIOD = 15;
        this.PARTIAL_REFUND_OPTIONS = {
            refundPercentage: 0.5,
            allowPartialRefunds: true
        };
    }
    isCancelable() {
        const difference = (0, exports.getDaysLeftUntilBooking)(this.booking.start_date);
        const isAbleToCancel = this.FULL_REFUND_PERIOD < difference;
        const bookedDate = luxon_1.DateTime.fromJSDate(this.booking.createdAt);
        const bookingStartDate = luxon_1.DateTime.fromJSDate(this.booking.start_date);
        if (bookedDate.diff(bookingStartDate, ['days']).days < this.FULL_REFUND_PERIOD) {
            if (Math.abs(bookedDate.diffNow(['days']).days) < 2)
                return true;
        }
        return isAbleToCancel;
    }
    refundAmount() {
        if (this.isWithinFullRefundDate())
            return this.booking.total;
        if (this.isCancelable())
            return this.booking.total * this.PARTIAL_REFUND_OPTIONS.refundPercentage;
        return 0;
    }
}
exports.StrictCancellationPolicyManager = StrictCancellationPolicyManager;
class BookingCancellationService {
    constructor(booking) {
        this.booking = booking;
        this.policyManager = this.getBookingPolicyManger(booking.policy);
    }
    getBookingPolicyManger(policy) {
        const policyMap = new Map();
        const DEFAULT_BOOKING_POLICY = new FlexibleCancellationPolicyManager(this.booking);
        policyMap.set(client_1.BookingPolicy.FLEXIBLE, DEFAULT_BOOKING_POLICY);
        policyMap.set(client_1.BookingPolicy.MODERATE, new ModerateCancellationPolicyManager(this.booking));
        policyMap.set(client_1.BookingPolicy.STRICT, new StrictCancellationPolicyManager(this.booking));
        return policyMap.get(policy) || DEFAULT_BOOKING_POLICY;
    }
    getDaysLeftUntilBooking() {
        const daysDiffrence = (0, date_helper_1.dateDifferenceFromNow)(this.booking.start_date);
        return Math.round(daysDiffrence);
    }
    isCancelable() {
        return this.policyManager.isCancelable();
    }
    refundAmount() {
        return this.policyManager.refundAmount();
    }
}
exports.BookingCancellationService = BookingCancellationService;
const getDaysLeftUntilBooking = (startDate) => {
    const daysDiffrence = (0, date_helper_1.dateDifferenceFromNow)(startDate);
    return Math.round(daysDiffrence);
};
exports.getDaysLeftUntilBooking = getDaysLeftUntilBooking;
//# sourceMappingURL=booking-cancel.helper.js.map