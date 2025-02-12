import { EventBoosterBuyerHistory } from "@prisma/client";
export declare class CreateEventBoosterBuyerHistoryDto implements Partial<EventBoosterBuyerHistory> {
    paymentId: string;
    eventId: string;
}
