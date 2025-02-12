import { IsString, ValidateNested } from 'class-validator';
import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { UserResponse } from './user-response.dto';

class UserAndTokenResponse {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @Type(() => UserResponse)
  @ValidateNested()
  user: UserResponse;
}

export class UserAndTokenResponseDto extends GeneralResponseDto {
  @ApiProperty()
  @Type(() => UserAndTokenResponse)
  @ValidateNested()
  data: UserAndTokenResponse;
}
