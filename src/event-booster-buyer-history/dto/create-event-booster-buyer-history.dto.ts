import { ApiProperty } from "@nestjs/swagger";
import { EventBoosterBuyerHistory } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventBoosterBuyerHistoryDto implements Partial<EventBoosterBuyerHistory> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
