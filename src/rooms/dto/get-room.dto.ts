import { Transform } from 'class-transformer';
import { IsNumberString, IsOptional } from 'class-validator';

export class GetAllRoomsQueryDto {
  @IsOptional()
  @IsNumberString()
  @Transform(({ value }) => +value, { toPlainOnly: true })
  place_id?: number;
}
