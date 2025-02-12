import { ApiProperty } from '@nestjs/swagger';
import { EnumTransferService, Prisma, RoomBed } from '@prisma/client';
import { Transform, Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  MinLength,
  ValidateIf,
  ValidateNested,
} from 'class-validator';
import { ApiString } from '../../../common/decorators/swagger.decorators';

export class CreateBedDto implements Pick<RoomBed, 'amount' | 'bed_type'> {
  @ApiString()
  @IsString()
  @MinLength(2)
  bed_type!: string;

  @ApiProperty()
  @IsNumber()
  amount!: number;
}

type RoomWithBedsType = Omit<
  Prisma.RoomCreateInput,
  'beds' | 'place' | 'createdAt'
>;

export class CreateRoomDto implements RoomWithBedsType {
  @ApiProperty()
  @IsNumber()
  place_id!: number;

  @ApiString()
  title!: string;

  @ApiProperty()
  @IsNumber()
  price!: number;

  @ApiProperty()
  @IsNumber()
  stock!: number;

  @ApiString()
  room_type!: string;

  @ApiProperty({ type: () => [CreateBedDto] })
  @ValidateNested({ each: true })
  @Type(() => CreateBedDto)
  @IsArray()
  @ArrayMinSize(1)
  beds!: CreateBedDto[];

  @ApiProperty()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  isDiscountAvailable: boolean;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ValidateIf((o) => o.isDiscountAvailable === true)
  discount?: number;

  @ApiProperty()
  @IsEnum(EnumTransferService)
  transferService: EnumTransferService;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @ValidateIf((o) => o.transferService === EnumTransferService.EXTRA_COST)
  extraAmount?: number;
}
