import { IsString, ValidateNested } from 'class-validator';
import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

class TokenResponse {
  @ApiProperty()
  @IsString()
  token: string;
}

export class TokenResponseDto extends GeneralResponseDto {
  @ApiProperty()
  @Type(() => TokenResponse)
  @ValidateNested()
  data: TokenResponse;
}
