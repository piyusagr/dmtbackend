import { PlaceBuyerHistory } from "@prisma/client";
export declare class CreatePlaceBuyerHistoryDto implements Partial<PlaceBuyerHistory> {
    paymentId: string;
    placeId: number;
    longOfStay: number;
}
