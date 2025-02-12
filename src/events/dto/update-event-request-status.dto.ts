import { IsEnum, IsIn, IsString } from 'class-validator';
import { EnumExperinceEventRequestStatus } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateEventRequestStatusDto {
  @ApiProperty()
  @IsString()
  eventListingId: string;

  @ApiProperty()
  @IsString()
  eventRequestId: string;

  @ApiProperty()
  @IsEnum(EnumExperinceEventRequestStatus)
  @IsIn([
    EnumExperinceEventRequestStatus.APPROVED,
    EnumExperinceEventRequestStatus.DECLINED,
    EnumExperinceEventRequestStatus.COMPLETED,
  ])
  status: EnumExperinceEventRequestStatus;
}
