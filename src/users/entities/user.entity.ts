import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { EnumUserRole, EnumUserStatus } from '@prisma/client';

export class UserEntity {
  @ApiProperty()
  id: number;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  email: string;

  @ApiHideProperty()
  password: string;

  @ApiProperty()
  phoneNumber: string;

  @ApiProperty()
  country: string;

  @ApiProperty({ enum: EnumUserRole })
  role: EnumUserRole;

  @ApiProperty({ enum: EnumUserStatus })
  status: EnumUserStatus;

  @ApiProperty()
  isSeller: boolean;

  @ApiProperty()
  isEmailConfirmed: boolean;

  @ApiProperty()
  isPhoneNumberConfirmed: boolean;

  @ApiProperty()
  isCountryConfirmed: boolean;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  constructor(user: UserEntity) {
    Object.assign(this, user);
  }
}
