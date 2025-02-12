import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CheckWhatsappCodeDto {
  @ApiProperty()
  @IsString()
  code: string;
}
