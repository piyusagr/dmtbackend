import { ApiProperty } from "@nestjs/swagger";
import { EventBuyerHistory } from "@prisma/client";
import { IsNotEmpty, IsString } from "class-validator";

export class CreateEventBuyerHistoryDto implements Partial<EventBuyerHistory> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  eventId: string;
}
