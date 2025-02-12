import { Prisma } from '@prisma/client';
import { UpdateRoomDto } from '../dto/update-room.dto';
interface BedReduce {
    created: {
        data: Prisma.RoomBedCreateWithoutRoomInput[];
    };
    updated: Prisma.RoomBedUpdateManyWithWhereWithoutRoomInput[];
}
export declare const getUpdatedBeds: (updateRoomDto: UpdateRoomDto) => BedReduce;
export {};
