import { CreateEventBuyerHistoryDto } from './create-event-buyer-history.dto';
import { EventBuyerHistory } from '@prisma/client';
declare const UpdateEventBuyerHistoryDto_base: import("@nestjs/common").Type<Partial<CreateEventBuyerHistoryDto>>;
export declare class UpdateEventBuyerHistoryDto extends UpdateEventBuyerHistoryDto_base implements Partial<EventBuyerHistory> {
    isApproved?: boolean;
    isRefunded?: boolean;
}
export {};
