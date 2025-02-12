import { EventBuyerHistory } from "@prisma/client";
export declare class CreateEventBuyerHistoryDto implements Partial<EventBuyerHistory> {
    paymentId: string;
    eventId: string;
}
