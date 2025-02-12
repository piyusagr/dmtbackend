import { ApiProperty } from '@nestjs/swagger';
import { Place, Room } from '@prisma/client';
import { CreateRoomDto } from '../dto/create-room.dto';
import { BedEntity } from './bed.entity';
import { PlaceEntity } from '../../places/entities/place.entity';

export class RoomEntity extends CreateRoomDto {
  @ApiProperty()
  id!: number;

  @ApiProperty({ type: () => [BedEntity] })
  beds!: BedEntity[];

  @ApiProperty()
  createdAt!: Date;

  @ApiProperty({ type: () => PlaceEntity })
  place?: Partial<Place> | null;

  constructor(room: Partial<RoomEntity | Room>) {
    super();
    Object.assign(this, room);
  }
}
