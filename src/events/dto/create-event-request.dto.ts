import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateEventRequestDTO {
  @ApiProperty()
  @IsString()
  eventListingId: string;
}
