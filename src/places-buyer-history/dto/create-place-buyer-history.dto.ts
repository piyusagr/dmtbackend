import { ApiProperty } from "@nestjs/swagger";
import { PlaceBuyerHistory } from "@prisma/client";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePlaceBuyerHistoryDto implements Partial<PlaceBuyerHistory> {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  paymentId: string;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  placeId: number;

  @ApiProperty()
  @IsNumber()
  @IsNotEmpty()
  longOfStay: number;
}
