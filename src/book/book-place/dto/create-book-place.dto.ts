import { IsDateString, IsNumber } from 'class-validator';

export class CreatePlaceBookingDto {
  @IsNumber({}, { each: true })
  room_ids!: number[];

  @IsDateString()
  start_date!: Date;

  @IsDateString()
  end_date!: Date;
}
