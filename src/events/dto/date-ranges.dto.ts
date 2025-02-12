import { IsDateString } from 'class-validator';
import { IsTimeFormat } from '../../../common/validators/time-format-validator';
import { ApiProperty } from '@nestjs/swagger';

export class DateRangesDTO {
  @ApiProperty()
  @IsDateString()
  date: string;

  @ApiProperty()
  @IsTimeFormat()
  startTime: string;

  @ApiProperty()
  @IsTimeFormat()
  endTime: string;
}
