import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignInWithGoogleDto {
  @ApiProperty()
  @IsString()
  token: string;
}
