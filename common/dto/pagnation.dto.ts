import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

export class PagnationDto {
  @IsNumber()
  @IsOptional()
  @Transform((limit) => parseInt(limit.value))
  limit = 30;

  @IsNumber()
  @IsOptional()
  @Transform((page) => parseInt(page.value))
  page = 0;
}
