import { Prisma } from '@prisma/client';
export declare class PlaceBuyerHistoryRepository {
    private logger;
    create(data: Prisma.PlaceBuyerHistoryCreateInput): Promise<{
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
    update(id: string, data: Prisma.PlaceBuyerHistoryUpdateInput): Promise<{
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
    delete(id: string): Promise<{
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
