import { Place } from '@prisma/client';
import { AssetEntity } from '../../assets/entities/asset.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';
declare class PlaceCountEntity {
    rooms: number;
    bookings: number;
    reviews: number;
}
declare const PlaceEntity_base: import("@nestjs/common").Type<Omit<CreatePlaceDto, "images">>;
export declare class PlaceEntity extends PlaceEntity_base implements Partial<Place> {
    id: number;
    createdAt: Date;
    rating: number;
    _count?: PlaceCountEntity;
    images: AssetEntity[];
    cover_image: AssetEntity[];
    cover_image_id: number;
    constructor(place: Partial<PlaceEntity>);
}
declare const RoomPriceEntity_base: import("@nestjs/common").Type<Pick<RoomEntity, "price">>;
export declare class RoomPriceEntity extends RoomPriceEntity_base {
}
export declare class PlaceActiveEntity extends PlaceEntity {
    rooms: RoomPriceEntity[];
}
declare const PlaceImagesEntity_base: import("@nestjs/common").Type<Pick<PlaceEntity, "cover_image" | "images">>;
export declare class PlaceImagesEntity extends PlaceImagesEntity_base {
}
export {};
