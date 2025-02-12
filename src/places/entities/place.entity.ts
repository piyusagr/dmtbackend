import { ApiProperty, OmitType, PickType } from '@nestjs/swagger';
import { Place } from '@prisma/client';
import { AssetEntity } from '../../assets/entities/asset.entity';
import { RoomEntity } from '../../rooms/entities/room.entity';
import { CreatePlaceDto } from '../dto/create-place.dto';

class PlaceCountEntity {
  @ApiProperty()
  rooms!: number;

  @ApiProperty()
  bookings!: number;

  @ApiProperty()
  reviews!: number;
}

export class PlaceEntity
  extends OmitType(CreatePlaceDto, ['images'])
  implements Partial<Place>
{
  @ApiProperty()
  id!: number;

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty()
  rating!: number;

  @ApiProperty()
  _count?: PlaceCountEntity;

  @ApiProperty({ type: () => [AssetEntity] })
  images!: AssetEntity[];

  @ApiProperty({ type: () => AssetEntity })
  cover_image!: AssetEntity[];

  cover_image_id!: number;

  constructor(place: Partial<PlaceEntity>) {
    super();
    Object.assign(this, place);
  }
}

/* Room with only price */
export class RoomPriceEntity extends PickType(RoomEntity, ['price']) {}

export class PlaceActiveEntity extends PlaceEntity {
  @ApiProperty({ type: () => RoomPriceEntity, isArray: true })
  rooms!: RoomPriceEntity[];
}

export class PlaceImagesEntity extends PickType(PlaceEntity, [
  'images',
  'cover_image',
]) {}
