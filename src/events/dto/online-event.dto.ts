import { IsString, ValidateNested } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DateRangesDTO } from './date-ranges.dto';
import { Type } from 'class-transformer';

export class OnlineEventDTO {
  @ApiProperty()
  @ValidateNested({ each: true })
  @Type(() => DateRangesDTO)
  dateRanges: DateRangesDTO[];

  @ApiProperty()
  @IsString()
  platform: string;

  @ApiProperty()
  @IsString()
  link: string;
}
