import { Prisma } from '@prisma/client';
export declare class EventBoosterBuyerHistoryRepository {
    private logger;
    create(data: Prisma.EventBoosterBuyerHistoryCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        sellerId: number;
        isApproved: boolean | null;
    }>;
    update(id: string, data: Prisma.EventBoosterBuyerHistoryUpdateInput): Promise<{
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
    delete(id: string): Promise<{
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
