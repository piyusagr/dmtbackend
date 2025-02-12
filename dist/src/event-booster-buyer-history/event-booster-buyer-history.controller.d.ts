import { EventBoosterBuyerHistoryService } from './event-booster-buyer-history.service';
import { RequestWithUser } from 'common/requests/request-with-user';
import { CreateEventBoosterBuyerHistoryDto } from './dto/create-event-booster-buyer-history.dto';
import { UpdateEventBoosterBuyerHistoryDto } from './dto/update-event-booster-buyer-history.dto';
import { PaymentService } from 'src/payment/service/payment.service';
export declare class EventBoosterBuyerHistoryController {
    private readonly eventBoosterBuyerHistoryService;
    private readonly paymentService;
    constructor(eventBoosterBuyerHistoryService: EventBoosterBuyerHistoryService, paymentService: PaymentService);
    create(req: RequestWithUser, createEventBoosterBuyerHistoryDto: CreateEventBoosterBuyerHistoryDto): Promise<{
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
