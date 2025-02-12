import { Prisma } from '@prisma/client';
export declare class EventBuyerHistoryRepository {
    private logger;
    create(data: Prisma.EventBuyerHistoryCreateInput): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        isRefunded: boolean | null;
        eventId: string;
        paymentId: string;
        buyerId: number;
        isApproved: boolean | null;
    }>;
    update(id: string, data: Prisma.EventBuyerHistoryUpdateInput): Promise<{
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
    delete(id: string): Promise<{
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
