import { EventBuyerHistoryService } from './event-buyer-history.service';
import { CreateEventBuyerHistoryDto } from './dto/create-event-buyer-history.dto';
import { UpdateEventBuyerHistoryDto } from './dto/update-event-buyer-history.dto';
import { RequestWithUser } from 'common/requests/request-with-user';
import { PaymentService } from 'src/payment/service/payment.service';
export declare class EventBuyerHistoryController {
    private readonly eventBuyerHistoryService;
    private readonly paymentService;
    constructor(eventBuyerHistoryService: EventBuyerHistoryService, paymentService: PaymentService);
    create(req: RequestWithUser, createEventBuyerHistoryDto: CreateEventBuyerHistoryDto): Promise<{
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
