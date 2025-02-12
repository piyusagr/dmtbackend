import { IsEnum, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EnumUserStatus } from '@prisma/client';

export class UpdateUserStatusDto {
  @ApiProperty()
  @IsNumber()
  userId: number;

  @ApiProperty()
  @IsEnum(EnumUserStatus)
  status: EnumUserStatus;
}
