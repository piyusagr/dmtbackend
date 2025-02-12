import { EventEmitter2 } from '@nestjs/event-emitter';
import { BookingStatus } from '@prisma/client';
import { PlacesService } from '../../places/places.service';
import { UserEntity } from '../../users/entities/user.entity';
import { CreatePlaceBookingDto } from './dto/create-book-place.dto';
interface BookPlaceData {
    buyer: UserEntity;
}
export declare class BookPlaceService {
    private readonly placeService;
    private eventEmitter;
    constructor(placeService: PlacesService, eventEmitter: EventEmitter2);
    bookPlace(placeId: number, bookPlaceDto: CreatePlaceBookingDto, params: BookPlaceData): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        expierence_id: number | null;
        start_date: Date;
        end_date: Date;
        policy: import(".prisma/client").$Enums.BookingPolicy;
        total: number;
        seller_id: number;
        buyer_id: number;
    }>;
    confirmBooking(bookingId: number): Promise<{
        place: {
            id: number;
            createdAt: Date;
            title: string;
            price: number | null;
            description: string;
            currency: string | null;
            place_type: string | null;
            street: string;
            city: string;
            province: string;
            postal_code: string;
            country: string;
            rating: number | null;
            subtitle: string | null;
            listing_status: import(".prisma/client").$Enums.ListingStats;
            booking_policy: import(".prisma/client").$Enums.BookingPolicy;
            latitude: number;
            longitude: number;
            businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
            individualNbr: string | null;
            individualTaxIdNbr: string | null;
            businessRegistrationNbr: string | null;
            businessTaxIdNbr: string | null;
            updatedAt: Date | null;
            user_id: number;
            cover_image_id: number | null;
        };
        seller: {
            id: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.EnumUserStatus;
            country: string | null;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            password: string | null;
            phoneNumber: string | null;
            role: import(".prisma/client").$Enums.EnumUserRole;
            isSeller: boolean;
            isEmailConfirmed: boolean;
            isPhoneNumberConfirmed: boolean;
            isCountryConfirmed: boolean;
            emailVerifyToken: string | null;
            passwordResetToken: string | null;
        };
        buyer: {
            id: number;
            createdAt: Date;
            status: import(".prisma/client").$Enums.EnumUserStatus;
            country: string | null;
            updatedAt: Date;
            firstName: string;
            lastName: string;
            email: string;
            password: string | null;
            phoneNumber: string | null;
            role: import(".prisma/client").$Enums.EnumUserRole;
            isSeller: boolean;
            isEmailConfirmed: boolean;
            isPhoneNumberConfirmed: boolean;
            isCountryConfirmed: boolean;
            emailVerifyToken: string | null;
            passwordResetToken: string | null;
        };
    } & {
        id: number;
        createdAt: Date;
        place_id: number | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        expierence_id: number | null;
        start_date: Date;
        end_date: Date;
        policy: import(".prisma/client").$Enums.BookingPolicy;
        total: number;
        seller_id: number;
        buyer_id: number;
    }>;
    cancelBooking(bookingId: number): Promise<number>;
    updateBookingStatus(bookingId: number, status: BookingStatus): Promise<{
        id: number;
        createdAt: Date;
        place_id: number | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        expierence_id: number | null;
        start_date: Date;
        end_date: Date;
        policy: import(".prisma/client").$Enums.BookingPolicy;
        total: number;
        seller_id: number;
        buyer_id: number;
    }>;
    getBookingsForBuyer(buyerId: number): Promise<({
        place: {
            id: number;
            createdAt: Date;
            title: string;
            price: number | null;
            description: string;
            currency: string | null;
            place_type: string | null;
            street: string;
            city: string;
            province: string;
            postal_code: string;
            country: string;
            rating: number | null;
            subtitle: string | null;
            listing_status: import(".prisma/client").$Enums.ListingStats;
            booking_policy: import(".prisma/client").$Enums.BookingPolicy;
            latitude: number;
            longitude: number;
            businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
            individualNbr: string | null;
            individualTaxIdNbr: string | null;
            businessRegistrationNbr: string | null;
            businessTaxIdNbr: string | null;
            updatedAt: Date | null;
            user_id: number;
            cover_image_id: number | null;
        };
    } & {
        id: number;
        createdAt: Date;
        place_id: number | null;
        status: import(".prisma/client").$Enums.BookingStatus;
        expierence_id: number | null;
        start_date: Date;
        end_date: Date;
        policy: import(".prisma/client").$Enums.BookingPolicy;
        total: number;
        seller_id: number;
        buyer_id: number;
    })[]>;
    testPayment(): Promise<import("stripe").Stripe.Response<import("stripe").Stripe.Transfer>>;
}
export {};
