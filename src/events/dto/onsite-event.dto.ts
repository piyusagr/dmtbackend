import { IsEnum, IsNumber, IsOptional, ValidateNested } from 'class-validator';
import { EnumPrivateGroupHosting, EnumTransferService } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
import { DateRangesDTO } from './date-ranges.dto';
import { Transform, Type } from 'class-transformer';

export class OnsiteEventDTO {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => DateRangesDTO)
  dateRanges: DateRangesDTO[];

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  extraAmount?: number;

  @ApiProperty()
  @IsEnum(EnumPrivateGroupHosting)
  @IsOptional()
  privateGroupHosting?: EnumPrivateGroupHosting;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  @IsOptional()
  privateGroupHostingCharge?: number;

  @ApiProperty()
  @IsEnum(EnumTransferService)
  transferService: EnumTransferService;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  longitude: number;
}
