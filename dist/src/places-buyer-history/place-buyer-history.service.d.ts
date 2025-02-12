import { PlaceBuyerHistoryRepository } from './place-buyer-history.repository';
import { CreatePlaceBuyerHistoryDto } from './dto/create-place-buyer-history.dto';
import { UpdatePlaceBuyerHistoryDto } from './dto/update-place-buyer-history.dto';
export declare class PlaceBuyerHistoryService {
    private readonly placeBuyerHistoryRepository;
    constructor(placeBuyerHistoryRepository: PlaceBuyerHistoryRepository);
    create(userId: number, createPlaceBuyerHistoryDto: CreatePlaceBuyerHistoryDto): Promise<{
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
