import { EventBoosterBuyerHistory } from '@prisma/client';
export declare class UpdateEventBoosterBuyerHistoryDto implements Partial<EventBoosterBuyerHistory> {
    isApproved?: boolean;
    isRefunded?: boolean;
}
