import { Booking, BookingPolicy } from '@prisma/client';
interface PartialRefundOptions {
    refundPercentage: number;
    allowPartialRefunds: boolean;
}
declare abstract class IBookingPolicyManager {
    abstract FULL_REFUND_PERIOD: number;
    abstract readonly booking: Booking;
    abstract PARTIAL_REFUND_OPTIONS: PartialRefundOptions;
    abstract isCancelable(): boolean;
    abstract refundAmount(): number;
}
export declare class CancellationPolicyManager implements IBookingPolicyManager {
    booking: Booking;
    FULL_REFUND_PERIOD: number;
    PARTIAL_REFUND_OPTIONS: PartialRefundOptions;
    private readonly logger;
    constructor(booking: Booking);
    isWithinFullRefundDate(): boolean;
    isCancelable(): boolean;
    refundAmount(): number;
}
export declare class FlexibleCancellationPolicyManager extends CancellationPolicyManager {
    booking: Booking;
    FULL_REFUND_PERIOD: number;
    constructor(booking: Booking);
}
export declare class ModerateCancellationPolicyManager extends CancellationPolicyManager {
    booking: Booking;
    FULL_REFUND_PERIOD: number;
    constructor(booking: Booking);
}
export declare class StrictCancellationPolicyManager extends CancellationPolicyManager {
    booking: Booking;
    FULL_REFUND_PERIOD: number;
    PARTIAL_REFUND_OPTIONS: PartialRefundOptions;
    constructor(booking: Booking);
    isCancelable(): boolean;
    refundAmount(): number;
}
export declare class BookingCancellationService {
    private booking;
    policyManager: IBookingPolicyManager;
    constructor(booking: Booking);
    getBookingPolicyManger(policy: BookingPolicy): IBookingPolicyManager | FlexibleCancellationPolicyManager;
    getDaysLeftUntilBooking(): number;
    isCancelable(): boolean;
    refundAmount(): number;
}
export declare const getDaysLeftUntilBooking: (startDate: Date) => number;
export {};
