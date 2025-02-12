import { Place, Room } from '@prisma/client';
import { CreateRoomDto } from '../dto/create-room.dto';
import { BedEntity } from './bed.entity';
export declare class RoomEntity extends CreateRoomDto {
    id: number;
    beds: BedEntity[];
    createdAt: Date;
    place?: Partial<Place> | null;
    constructor(room: Partial<RoomEntity | Room>);
}
