import { ApiProperty, PartialType } from '@nestjs/swagger';
import { EventBoosterBuyerHistory } from '@prisma/client';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEventBoosterBuyerHistoryDto implements Partial<EventBoosterBuyerHistory> {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRefunded?: boolean;
}
