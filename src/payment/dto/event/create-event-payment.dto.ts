import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventPaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  eventId: string;
}
