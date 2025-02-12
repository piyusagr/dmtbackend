import {
  ApiProperty,
  ApiPropertyOptional,
  PartialType,
  OmitType,
} from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNumber,
  IsOptional,
  ValidateNested,
} from 'class-validator';
import { CreateBedDto, CreateRoomDto } from './create-room.dto';

export class UpdateBedDto extends PartialType(CreateBedDto) {
  @IsOptional()
  @IsNumber()
  @ApiPropertyOptional()
  id!: number;
}

export class UpdateRoomDto extends PartialType(
  OmitType(CreateRoomDto, ['beds']),
) {
  @ApiPropertyOptional({ type: () => [Number] })
  @IsOptional()
  @IsArray()
  @IsNumber({ allowNaN: false }, { each: true })
  delete_bed_ids?: number[];

  @ApiProperty({ type: () => [UpdateBedDto] })
  @ValidateNested({ each: true })
  @Type(() => UpdateBedDto)
  @IsArray()
  @ArrayMinSize(1)
  beds!: UpdateBedDto[];
}
