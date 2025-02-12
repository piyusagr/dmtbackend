import { ApiProperty } from '@nestjs/swagger';
import { PlaceBuyerHistory } from '@prisma/client';
import { IsBoolean, IsOptional } from 'class-validator';

export class UpdatePlaceBuyerHistoryDto implements Partial<PlaceBuyerHistory> {
  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isApproved?: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBoolean()
  isRefunded?: boolean;
}
