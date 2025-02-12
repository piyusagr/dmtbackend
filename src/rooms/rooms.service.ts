import { Injectable, NotFoundException } from '@nestjs/common';
// import { Prisma } from '@prisma/client';
import prisma from '../../config/db';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { RoomEntity } from './entities/room.entity';
import { getUpdatedBeds } from './helpers/room.helpers';

// const DEFAULT_ROOM_SELECT: Prisma.RoomInclude = {
//   place: {
//     select: {
//       user_id: true,
//     },
//   },
// };

@Injectable()
export class RoomsService {
  async create(createRoomDto: CreateRoomDto) {
    try {
      return await prisma.room.create({
        data: {
          ...createRoomDto,
          beds: {
            createMany: { data: createRoomDto.beds, skipDuplicates: true },
          },
        },
        include: { place: true, beds: true },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findAllByPlaceId(placeId: number) {
    try {
      return await prisma.room.findMany({
        where: {
          place_id: placeId,
        },
        include: {
          beds: true,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async findOneByPlaceId(placeId: number, roomId: number): Promise<RoomEntity> {
    try {
      const room = await prisma.room.findFirst({
        where: {
          id: roomId,
          place_id: placeId,
        },
        include: {
          place: true,
          beds: true,
        },
      });

      if (!room) {
        return Promise.reject(new NotFoundException('Room not found'));
      }

      return room;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, updateRoomDto: UpdateRoomDto): Promise<RoomEntity> {
    const beds = getUpdatedBeds(updateRoomDto);

    try {
      return await prisma.room.update({
        where: {
          id: id,
        },
        data: {
          ...updateRoomDto,
          beds: {
            updateMany: beds?.updated,
            createMany: beds?.created,
          },
        },
        include: { place: true, beds: true },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async remove(id: number): Promise<any> {
    try {
      console.log(`room`, id);

      return await prisma.room.delete({
        where: {
          id,
        },
      });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
