import { PlaceBuyerHistory } from '@prisma/client';
export declare class UpdatePlaceBuyerHistoryDto implements Partial<PlaceBuyerHistory> {
    isApproved?: boolean;
    isRefunded?: boolean;
}
