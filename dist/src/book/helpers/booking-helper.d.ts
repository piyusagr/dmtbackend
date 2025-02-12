import { Room } from '@prisma/client';
interface PlaceBookingData {
    startDate: Date;
    endDate: Date;
    rooms: Room[];
    selectedRoomIds: number[];
}
export declare abstract class IBookingCalculator {
    startDate: Date;
    endDate: Date;
    abstract getBookingTotal(): any;
    abstract getSelectedPackages(): any;
    abstract hasInvalidPackage(): boolean;
}
export declare class PlaceBookingCalculator implements IBookingCalculator {
    private bookingData;
    startDate: Date;
    endDate: Date;
    constructor(bookingData: PlaceBookingData);
    getBookingTotal(): number;
    getSelectedPackages(): {
        id: number;
        createdAt: Date;
        title: string;
        price: number;
        stock: number;
        room_type: string;
        isDiscountAvailable: boolean;
        discount: number | null;
        transferService: import(".prisma/client").$Enums.EnumTransferService;
        extraAmount: number | null;
        place_id: number;
    }[];
    hasInvalidPackage(): boolean;
}
export declare class BookingManager {
    bookingCalculator: IBookingCalculator;
    constructor(bookingCalculator: IBookingCalculator);
    getBookingTotal(): number;
}
export {};
