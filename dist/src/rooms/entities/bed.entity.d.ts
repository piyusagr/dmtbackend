import { RoomBed } from '@prisma/client';
import { CreateBedDto } from '../dto/create-room.dto';
export declare class BedEntity extends CreateBedDto implements RoomBed {
    id: number;
    room_id: number;
}
