import { ApiProperty } from '@nestjs/swagger';
import { RoomBed } from '@prisma/client';
import { CreateBedDto } from '../dto/create-room.dto';

export class BedEntity extends CreateBedDto implements RoomBed {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  room_id!: number;
}
