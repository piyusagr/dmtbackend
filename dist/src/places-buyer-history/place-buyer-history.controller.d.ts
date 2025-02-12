import { PlaceBuyerHistoryService } from './place-buyer-history.service';
import { RequestWithUser } from 'common/requests/request-with-user';
import { CreatePlaceBuyerHistoryDto } from './dto/create-place-buyer-history.dto';
import { UpdatePlaceBuyerHistoryDto } from './dto/update-place-buyer-history.dto';
import { PaymentService } from 'src/payment/service/payment.service';
export declare class PlaceBuyerHistoryController {
    private readonly placeBuyerHistoryService;
    private readonly paymentService;
    constructor(placeBuyerHistoryService: PlaceBuyerHistoryService, paymentService: PaymentService);
    create(req: RequestWithUser, createPlaceBuyerHistoryDto: CreatePlaceBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
        longOfStay: number | null;
        placeId: number;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
        longOfStay: number | null;
        placeId: number;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
        longOfStay: number | null;
        placeId: number;
    }>;
    update(id: string, updatePlaceBuyerHistoryDto: UpdatePlaceBuyerHistoryDto): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
        longOfStay: number | null;
        placeId: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
        longOfStay: number | null;
        placeId: number;
    }>;
}
