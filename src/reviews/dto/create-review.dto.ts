import { ApiProperty } from '@nestjs/swagger';
import { Review } from '@prisma/client';
import { IsNumber, Max, Min } from 'class-validator';
import { Exactly } from '../../../helpers/type.helpers';

export class CreateReviewDto implements Exactly<Review, CreateReviewDto> {
  @Max(10)
  @Min(1)
  @ApiProperty()
  @IsNumber()
  cleanliness: number;

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
  roomComfort: number;

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
