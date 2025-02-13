import { Prisma } from '@prisma/client';
import { CreateEventDTO } from './dto/create-event.dto';
import { CreateEventRequestDTO } from './dto/create-event-request.dto';
import { UpdateEventRequestStatusDto } from './dto/update-event-request-status.dto';
import { UserEntity } from '../users/entities/user.entity';
import { ImageService } from '../../common/services/images/image.service';
export declare class EventsService {
    private readonly imageService;
    constructor(imageService: ImageService);
    createEvent(data: CreateEventDTO, userId: number, user: UserEntity, files: Express.Multer.File[]): Promise<any>;
    getEvents(): Promise<({
        OnlineEvent: {
            id: string;
            createdAt: Date;
            eventListingId: string;
            updatedAt: Date;
            link: string | null;
            dateRanges: Prisma.JsonValue[];
            platform: string;
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
        };
        OnsiteEvent: {
            id: string;
            createdAt: Date;
            transferService: import(".prisma/client").$Enums.EnumTransferService;
            extraAmount: number;
            eventListingId: string;
            latitude: number;
            longitude: number;
            updatedAt: Date;
            dateRanges: Prisma.JsonValue[];
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
            privateGroupHosting: import(".prisma/client").$Enums.EnumPrivateGroupHosting | null;
            privateGroupHostingCharge: number | null;
        };
        files: {
            id: number;
            createdAt: Date;
            place_id: number | null;
            original_name: string;
            url: string;
            mimetype: string;
            uid: string;
            file_key: string;
            eventListingId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        price: number | null;
        isDiscountAvailable: boolean;
        discount: number | null;
        status: import(".prisma/client").$Enums.EnumExperienceEventStatus | null;
        currency: string;
        businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
        individualNbr: string | null;
        individualTaxIdNbr: string | null;
        businessRegistrationNbr: string | null;
        businessTaxIdNbr: string | null;
        updatedAt: Date;
        location: string;
        isActive: boolean;
        isRetired: boolean;
        sellerId: number;
        photos: string[];
        eventType: import(".prisma/client").$Enums.EnumEventType;
        isBoosted: boolean;
        maxBoostedDay: number | null;
        category: string | null;
        highlight: string;
        imageUrl: string | null;
        dateType: import(".prisma/client").$Enums.EnumEventDateType;
        nbrOfDays: number;
        hoursPerDay: number;
        maxAttendances: number;
        language: string;
        requirements: string[];
        otherInformation: string | null;
        guestInformation: string | null;
        hostInformation: string | null;
        cancellationPolicy: string | null;
        hostSkillLevel: import(".prisma/client").$Enums.EnumHostSkillLevel;
        business: string[];
        experiential: string[];
        healthAndWellness: string | null;
        specialInterest: string | null;
        isPaid: boolean;
        listingPaidType: import(".prisma/client").$Enums.EnumListingPaidType | null;
        noOfPromotionDays: number;
        eventBoostedCategoryId: number | null;
    })[]>;
    getHostedEventsBySellerId(sellerId: number): Promise<({
        OnlineEvent: {
            id: string;
            createdAt: Date;
            eventListingId: string;
            updatedAt: Date;
            link: string | null;
            dateRanges: Prisma.JsonValue[];
            platform: string;
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
        };
        OnsiteEvent: {
            id: string;
            createdAt: Date;
            transferService: import(".prisma/client").$Enums.EnumTransferService;
            extraAmount: number;
            eventListingId: string;
            latitude: number;
            longitude: number;
            updatedAt: Date;
            dateRanges: Prisma.JsonValue[];
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
            privateGroupHosting: import(".prisma/client").$Enums.EnumPrivateGroupHosting | null;
            privateGroupHostingCharge: number | null;
        };
        files: {
            id: number;
            createdAt: Date;
            place_id: number | null;
            original_name: string;
            url: string;
            mimetype: string;
            uid: string;
            file_key: string;
            eventListingId: string | null;
        }[];
    } & {
        name: string;
        id: string;
        createdAt: Date;
        price: number | null;
        isDiscountAvailable: boolean;
        discount: number | null;
        status: import(".prisma/client").$Enums.EnumExperienceEventStatus | null;
        currency: string;
        businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
        individualNbr: string | null;
        individualTaxIdNbr: string | null;
        businessRegistrationNbr: string | null;
        businessTaxIdNbr: string | null;
        updatedAt: Date;
        location: string;
        isActive: boolean;
        isRetired: boolean;
        sellerId: number;
        photos: string[];
        eventType: import(".prisma/client").$Enums.EnumEventType;
        isBoosted: boolean;
        maxBoostedDay: number | null;
        category: string | null;
        highlight: string;
        imageUrl: string | null;
        dateType: import(".prisma/client").$Enums.EnumEventDateType;
        nbrOfDays: number;
        hoursPerDay: number;
        maxAttendances: number;
        language: string;
        requirements: string[];
        otherInformation: string | null;
        guestInformation: string | null;
        hostInformation: string | null;
        cancellationPolicy: string | null;
        hostSkillLevel: import(".prisma/client").$Enums.EnumHostSkillLevel;
        business: string[];
        experiential: string[];
        healthAndWellness: string | null;
        specialInterest: string | null;
        isPaid: boolean;
        listingPaidType: import(".prisma/client").$Enums.EnumListingPaidType | null;
        noOfPromotionDays: number;
        eventBoostedCategoryId: number | null;
    })[]>;
    getEvent(eventListingId: string): Promise<{
        OnlineEvent: {
            id: string;
            createdAt: Date;
            eventListingId: string;
            updatedAt: Date;
            link: string | null;
            dateRanges: Prisma.JsonValue[];
            platform: string;
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
        };
        OnsiteEvent: {
            id: string;
            createdAt: Date;
            transferService: import(".prisma/client").$Enums.EnumTransferService;
            extraAmount: number;
            eventListingId: string;
            latitude: number;
            longitude: number;
            updatedAt: Date;
            dateRanges: Prisma.JsonValue[];
            isActive: boolean;
            isRetired: boolean;
            sellerId: number;
            privateGroupHosting: import(".prisma/client").$Enums.EnumPrivateGroupHosting | null;
            privateGroupHostingCharge: number | null;
        };
        files: {
            id: number;
            createdAt: Date;
            place_id: number | null;
            original_name: string;
            url: string;
            mimetype: string;
            uid: string;
            file_key: string;
            eventListingId: string | null;
        }[];
        EventBoostedCategory: {
            name: string;
            id: number;
            createdAt: Date;
            updatedAt: Date;
            charge: number;
        };
    } & {
        name: string;
        id: string;
        createdAt: Date;
        price: number | null;
        isDiscountAvailable: boolean;
        discount: number | null;
        status: import(".prisma/client").$Enums.EnumExperienceEventStatus | null;
        currency: string;
        businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
        individualNbr: string | null;
        individualTaxIdNbr: string | null;
        businessRegistrationNbr: string | null;
        businessTaxIdNbr: string | null;
        updatedAt: Date;
        location: string;
        isActive: boolean;
        isRetired: boolean;
        sellerId: number;
        photos: string[];
        eventType: import(".prisma/client").$Enums.EnumEventType;
        isBoosted: boolean;
        maxBoostedDay: number | null;
        category: string | null;
        highlight: string;
        imageUrl: string | null;
        dateType: import(".prisma/client").$Enums.EnumEventDateType;
        nbrOfDays: number;
        hoursPerDay: number;
        maxAttendances: number;
        language: string;
        requirements: string[];
        otherInformation: string | null;
        guestInformation: string | null;
        hostInformation: string | null;
        cancellationPolicy: string | null;
        hostSkillLevel: import(".prisma/client").$Enums.EnumHostSkillLevel;
        business: string[];
        experiential: string[];
        healthAndWellness: string | null;
        specialInterest: string | null;
        isPaid: boolean;
        listingPaidType: import(".prisma/client").$Enums.EnumListingPaidType | null;
        noOfPromotionDays: number;
        eventBoostedCategoryId: number | null;
    }>;
    deleteEvent(eventListingId: string, userId: number): Promise<never>;
    createEventRequest(data: CreateEventRequestDTO, userId: number): Promise<{
        id: string;
        createdAt: Date;
        eventListingId: string;
        status: import(".prisma/client").$Enums.EnumExperinceEventRequestStatus;
        updatedAt: Date;
        isRefunded: boolean;
        paymentStatus: import(".prisma/client").$Enums.EnumOnlineEventPaymentStatus;
        eventId: string;
        paymentId: string | null;
        buyerId: number;
    }>;
    getEventRequestsByEventId(eventListingId: string, userId: number): Promise<{
        id: string;
        createdAt: Date;
        eventListingId: string;
        status: import(".prisma/client").$Enums.EnumExperinceEventRequestStatus;
        updatedAt: Date;
        isRefunded: boolean;
        paymentStatus: import(".prisma/client").$Enums.EnumOnlineEventPaymentStatus;
        eventId: string;
        paymentId: string | null;
        buyerId: number;
    }[]>;
    updateEventRequestStatus(data: UpdateEventRequestStatusDto): Promise<{
        id: string;
        createdAt: Date;
        eventListingId: string;
        status: import(".prisma/client").$Enums.EnumExperinceEventRequestStatus;
        updatedAt: Date;
        isRefunded: boolean;
        paymentStatus: import(".prisma/client").$Enums.EnumOnlineEventPaymentStatus;
        eventId: string;
        paymentId: string | null;
        buyerId: number;
    }>;
    getReservationsForBuyer(buyerId: number): Promise<{
        online: ({
            EventListing: {
                name: string;
                id: string;
                createdAt: Date;
                price: number | null;
                isDiscountAvailable: boolean;
                discount: number | null;
                status: import(".prisma/client").$Enums.EnumExperienceEventStatus | null;
                currency: string;
                businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
                individualNbr: string | null;
                individualTaxIdNbr: string | null;
                businessRegistrationNbr: string | null;
                businessTaxIdNbr: string | null;
                updatedAt: Date;
                location: string;
                isActive: boolean;
                isRetired: boolean;
                sellerId: number;
                photos: string[];
                eventType: import(".prisma/client").$Enums.EnumEventType;
                isBoosted: boolean;
                maxBoostedDay: number | null;
                category: string | null;
                highlight: string;
                imageUrl: string | null;
                dateType: import(".prisma/client").$Enums.EnumEventDateType;
                nbrOfDays: number;
                hoursPerDay: number;
                maxAttendances: number;
                language: string;
                requirements: string[];
                otherInformation: string | null;
                guestInformation: string | null;
                hostInformation: string | null;
                cancellationPolicy: string | null;
                hostSkillLevel: import(".prisma/client").$Enums.EnumHostSkillLevel;
                business: string[];
                experiential: string[];
                healthAndWellness: string | null;
                specialInterest: string | null;
                isPaid: boolean;
                listingPaidType: import(".prisma/client").$Enums.EnumListingPaidType | null;
                noOfPromotionDays: number;
                eventBoostedCategoryId: number | null;
            };
            Event: {
                id: string;
                createdAt: Date;
                eventListingId: string;
                updatedAt: Date;
                link: string | null;
                dateRanges: Prisma.JsonValue[];
                platform: string;
                isActive: boolean;
                isRetired: boolean;
                sellerId: number;
            };
        } & {
            id: string;
            createdAt: Date;
            eventListingId: string;
            status: import(".prisma/client").$Enums.EnumExperinceEventRequestStatus;
            updatedAt: Date;
            isRefunded: boolean;
            paymentStatus: import(".prisma/client").$Enums.EnumOnlineEventPaymentStatus;
            eventId: string;
            paymentId: string | null;
            buyerId: number;
        })[];
        onsite: ({
            EventListing: {
                name: string;
                id: string;
                createdAt: Date;
                price: number | null;
                isDiscountAvailable: boolean;
                discount: number | null;
                status: import(".prisma/client").$Enums.EnumExperienceEventStatus | null;
                currency: string;
                businessNature: import(".prisma/client").$Enums.EnumBusinessNature;
                individualNbr: string | null;
                individualTaxIdNbr: string | null;
                businessRegistrationNbr: string | null;
                businessTaxIdNbr: string | null;
                updatedAt: Date;
                location: string;
                isActive: boolean;
                isRetired: boolean;
                sellerId: number;
                photos: string[];
                eventType: import(".prisma/client").$Enums.EnumEventType;
                isBoosted: boolean;
                maxBoostedDay: number | null;
                category: string | null;
                highlight: string;
                imageUrl: string | null;
                dateType: import(".prisma/client").$Enums.EnumEventDateType;
                nbrOfDays: number;
                hoursPerDay: number;
                maxAttendances: number;
                language: string;
                requirements: string[];
                otherInformation: string | null;
                guestInformation: string | null;
                hostInformation: string | null;
                cancellationPolicy: string | null;
                hostSkillLevel: import(".prisma/client").$Enums.EnumHostSkillLevel;
                business: string[];
                experiential: string[];
                healthAndWellness: string | null;
                specialInterest: string | null;
                isPaid: boolean;
                listingPaidType: import(".prisma/client").$Enums.EnumListingPaidType | null;
                noOfPromotionDays: number;
                eventBoostedCategoryId: number | null;
            };
            Event: {
                id: string;
                createdAt: Date;
                transferService: import(".prisma/client").$Enums.EnumTransferService;
                extraAmount: number;
                eventListingId: string;
                latitude: number;
                longitude: number;
                updatedAt: Date;
                dateRanges: Prisma.JsonValue[];
                isActive: boolean;
                isRetired: boolean;
                sellerId: number;
                privateGroupHosting: import(".prisma/client").$Enums.EnumPrivateGroupHosting | null;
                privateGroupHostingCharge: number | null;
            };
        } & {
            id: string;
            createdAt: Date;
            eventListingId: string;
            status: import(".prisma/client").$Enums.EnumExperinceEventRequestStatus;
            updatedAt: Date;
            isRefunded: boolean;
            paymentStatus: import(".prisma/client").$Enums.EnumOnlineEventPaymentStatus;
            eventId: string;
            paymentId: string | null;
            buyerId: number;
        })[];
    }>;
}
