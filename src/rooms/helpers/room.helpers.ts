import { Prisma } from '@prisma/client';
import { UpdateRoomDto } from '../dto/update-room.dto';

interface BedReduce {
  created: { data: Prisma.RoomBedCreateWithoutRoomInput[] };
  updated: Prisma.RoomBedUpdateManyWithWhereWithoutRoomInput[];
}

export const getUpdatedBeds = (updateRoomDto: UpdateRoomDto) => {
  if (!updateRoomDto?.beds || !updateRoomDto.beds?.length) return;

  const bedsResponse = updateRoomDto.beds.reduce(
    (acc: BedReduce, bed) => {
      if (!bed.id && bed.amount && bed.bed_type) {
        acc.created.data.push({
          amount: bed.amount,
          bed_type: bed.bed_type
        });
        return acc;
      }

      acc.updated.push({ where: { id: bed.id }, data: bed });
      return acc;
    },
    {
      created: { data: [] },
      updated: []
    }
  );

  return bedsResponse;
};
