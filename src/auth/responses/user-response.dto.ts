import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsString,
  ValidateNested,
} from 'class-validator';
import { GeneralResponseDto } from '../../../common/responses/general-response.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { EnumUserRole, EnumUserStatus } from '@prisma/client';

export class UserResponse {
  @ApiProperty()
  @IsNumber()
  id: number;

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
  phoneNumber: string;

  @ApiProperty()
  @IsString()
  country: string;

  @ApiProperty()
  @IsEnum(EnumUserRole)
  role: EnumUserRole;

  @ApiProperty()
  @IsBoolean()
  isSeller: boolean;

  @ApiProperty()
  @IsBoolean()
  isEmailConfirmed: boolean;

  @ApiProperty()
  @IsBoolean()
  isPhoneNumberConfirmed: boolean;

  @ApiProperty()
  @IsBoolean()
  isCountryConfirmed: boolean;

  @ApiProperty()
  @IsEnum(EnumUserStatus)
  status: EnumUserStatus;

  @ApiProperty()
  @IsString()
  createdAt: string;

  @ApiProperty()
  @IsString()
  updatedAt: string;
}

export class UserResponseDto extends GeneralResponseDto {
  @ApiProperty()
  @Type(() => UserResponse)
  @ValidateNested()
  data: UserResponse;
}
