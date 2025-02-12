import { Prisma } from '@prisma/client';
export declare class GetPlaceQueryDto implements Prisma.PlaceInclude {
    rooms?: boolean;
    reviews?: boolean;
    bookings?: boolean;
    _count?: boolean;
}
