import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignUpWithEmailDto {
  @ApiProperty()
  @IsString()
  firstName: string;

  @ApiProperty()
  @IsString()
  lastName: string;

  @ApiProperty()
  @IsString()
  email: string;

  @ApiProperty()
  @IsString()
  password: string;
}
