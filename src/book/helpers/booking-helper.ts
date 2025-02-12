import { Place, Room } from '@prisma/client';
import { ApiError } from '../../../common/errors/api.error';
import { getDateDifference, isValidDate } from '../../../helpers/date.helper';
import { RoomEntity } from '../../rooms/entities/room.entity';

interface PlaceBookingData {
  startDate: Date;
  endDate: Date;
  rooms: Room[];
  selectedRoomIds: number[];
}

export abstract class IBookingCalculator {
  startDate!: Date;
  endDate!: Date;

  abstract getBookingTotal(): any;
  abstract getSelectedPackages(): any;
  abstract hasInvalidPackage(): boolean;
}

export class PlaceBookingCalculator implements IBookingCalculator {
  public startDate!: Date;
  public endDate!: Date;

  constructor(private bookingData: PlaceBookingData) {
    this.startDate = new Date(bookingData.startDate);
    this.endDate = new Date(bookingData.endDate);

    if (!isValidDate(this.startDate))
      throw new ApiError('Must specify a valid start_date');
    if (!isValidDate(this.endDate))
      throw new ApiError('Must specify a valid end_date');
  }

  getBookingTotal() {
    const dateDifference = getDateDifference(this.startDate, this.endDate);
    const total = this.getSelectedPackages()
      .map((room) => room.price * dateDifference)
      .reduce((acc, curr) => (acc += curr), 0);

    return total;
  }

  getSelectedPackages() {
    const rooms = this.bookingData.rooms.filter((room) =>
      this.bookingData.selectedRoomIds.includes(room.id)
    );

    return rooms;
  }

  hasInvalidPackage(): boolean {
    return (
      this.getSelectedPackages().length !==
      this.bookingData.selectedRoomIds.length
    );
  }
}

// Commented out (Currently Unused)
export class BookingManager {
  constructor(public bookingCalculator: IBookingCalculator) {}

  getBookingTotal(): number {
    return this.bookingCalculator.getBookingTotal();
  }
}
