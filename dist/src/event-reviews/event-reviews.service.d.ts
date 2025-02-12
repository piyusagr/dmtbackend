import { OnlineEventReviewCreateDto } from './dtos/online-event-review-create.dto';
import { OnsiteEventReviewCreateDto } from './dtos/onsite-event-review-create.dto';
export declare class EventReviewsService {
    createOnlineEventReview(data: OnlineEventReviewCreateDto, buyerId: number): Promise<any>;
    createOnsiteEventReview(data: OnsiteEventReviewCreateDto, buyerId: number): Promise<any>;
    getEventReviewsByEventListingId(eventListingId: string): Promise<{
        id: string;
        createdAt: Date;
        eventListingId: string;
        updatedAt: Date;
        serviceQuality: number;
        valueForMoney: number;
        eventId: string;
        buyerId: number;
        sellerCommunication: number;
        eventRequestId: string;
    }[] | {
        id: string;
        createdAt: Date;
        eventListingId: string;
        updatedAt: Date;
        facilities: number;
        location: number;
        serviceQuality: number;
        valueForMoney: number;
        eventId: string;
        buyerId: number;
        eventRequestId: string;
    }[]>;
    deleteReviewByReviewId(eventListingId: string, reviewId: string): Promise<{
        id: string;
        createdAt: Date;
        eventListingId: string;
        updatedAt: Date;
        serviceQuality: number;
        valueForMoney: number;
        eventId: string;
        buyerId: number;
        sellerCommunication: number;
        eventRequestId: string;
    } | {
        id: string;
        createdAt: Date;
        eventListingId: string;
        updatedAt: Date;
        facilities: number;
        location: number;
        serviceQuality: number;
        valueForMoney: number;
        eventId: string;
        buyerId: number;
        eventRequestId: string;
    }>;
}
