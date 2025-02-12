import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SendCodeDto {
  @ApiProperty()
  @IsString()
  country: string;
}
