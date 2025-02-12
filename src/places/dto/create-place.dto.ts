import { ApiProperty } from '@nestjs/swagger';
import {
  BookingPolicy,
  EnumBusinessNature,
  ListingStats,
  Prisma,
} from '@prisma/client';
import { Transform } from 'class-transformer';
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';
import { ApiString } from '../../../common/decorators/swagger.decorators';
import { TransformAssign } from '../../../helpers/related-action.helper';
import { Exactly } from '../../../helpers/type.helpers';

type PlaceWithImages = Prisma.PlaceCreateArgs['data'];

export class CreatePlaceDto
  implements Exactly<PlaceWithImages, CreatePlaceDto>
{
  @ApiString()
  title!: string;

  @MinLength(10)
  @ApiString({ apiParams: { minLength: 10 } })
  description!: string;

  @IsEnum(ListingStats)
  @ApiProperty({ enum: ListingStats })
  @IsOptional()
  listing_status!: ListingStats;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude!: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude!: number;

  @ApiProperty()
  @IsEnum(EnumBusinessNature)
  businessNature: EnumBusinessNature;

  @ApiProperty()
  @IsOptional()
  @IsString()
  individualNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  individualTaxIdNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessRegistrationNbr?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  businessTaxIdNbr?: string;

  @ApiString()
  street!: string;

  @ApiString()
  city!: string;

  @ApiString()
  province!: string;

  @ApiString()
  postal_code!: string;

  @ApiString()
  country!: string;

  @ApiString({ optional: true, apiParams: { type: String } })
  subtitle!: string | null;

  @ApiString({ optional: true })
  place_type!: string | null;

  @ApiProperty({ enum: BookingPolicy })
  @IsEnum(BookingPolicy)
  @IsOptional()
  booking_policy!: BookingPolicy;

  @TransformAssign()
  images!: Prisma.PlaceCreateArgs['data']['images'];

  rating?: number | null;
}
