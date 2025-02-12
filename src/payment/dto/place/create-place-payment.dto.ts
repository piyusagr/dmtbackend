import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsPositive, IsString } from "class-validator";

export class CreatePlacePaymentDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  placeId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsPositive()
  longOfStay: number;
}
