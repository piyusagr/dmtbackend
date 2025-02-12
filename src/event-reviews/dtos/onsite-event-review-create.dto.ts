import { IsNumber, IsString, Max, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class OnsiteEventReviewCreateDto {

  @ApiProperty()
  @IsString()
  eventListingId: string;

  @ApiProperty()
  @IsString()
  eventId: string;

  @ApiProperty()
  @IsString()
  eventRequestId: string;

  @Max(10)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  facilities: number;

  @Max(10)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  location: number;

  @Max(10)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  serviceQuality: number;

  @Max(10)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  valueForMoney: number;
}
