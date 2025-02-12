import { EventBoosterBuyerHistoryRepository } from './event-booster-buyer-history.repository';
import { CreateEventBoosterBuyerHistoryDto } from './dto/create-event-booster-buyer-history.dto';
import { UpdateEventBoosterBuyerHistoryDto } from './dto/update-event-booster-buyer-history.dto';
export declare class EventBoosterBuyerHistoryService {
    private readonly eventBoosterBuyerHistoryRepository;
    constructor(eventBoosterBuyerHistoryRepository: EventBoosterBuyerHistoryRepository);
    create(userId: number, createEventBoosterBuyerHistoryDto: CreateEventBoosterBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }>;
    update(id: string, updateEventBoosterBuyerHistoryDto: UpdateEventBoosterBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }>;
}
