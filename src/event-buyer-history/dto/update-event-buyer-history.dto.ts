import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateEventBuyerHistoryDto } from './create-event-buyer-history.dto';
import { EventBuyerHistory } from '@prisma/client';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateEventBuyerHistoryDto extends PartialType(CreateEventBuyerHistoryDto) implements Partial<EventBuyerHistory> {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRefunded?: boolean;
}
