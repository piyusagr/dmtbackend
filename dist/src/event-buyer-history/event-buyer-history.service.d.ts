import { CreateEventBuyerHistoryDto } from './dto/create-event-buyer-history.dto';
import { UpdateEventBuyerHistoryDto } from './dto/update-event-buyer-history.dto';
import { EventBuyerHistoryRepository } from './event-buyer-history.repository';
export declare class EventBuyerHistoryService {
    private readonly buyerHistoryRepository;
    constructor(buyerHistoryRepository: EventBuyerHistoryRepository);
    create(userId: number, createEventBuyerHistoryDto: CreateEventBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }>;
    update(id: string, updateEventBuyerHistoryDto: UpdateEventBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }>;
}
