import { ApiProperty } from '@nestjs/swagger';
import { ApiString } from '../../../common/decorators/swagger.decorators';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiString()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  firstName?: string;

  @ApiString()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  lastName?: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  @IsOptional()
  email?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;
}
