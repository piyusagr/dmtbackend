import { ApiProperty } from '@nestjs/swagger';
import { EnumUserRole } from '@prisma/client';
import { UserSession } from '../../../types/user';

export class UserSessionEntity implements UserSession {
  @ApiProperty()
  id!: number;

  @ApiProperty()
  firstName!: string;
  // first_name!: string;

  @ApiProperty()
  lastName!: string;
  // last_name!: string;

  @ApiProperty()
  email!: string;

  @ApiProperty()
  phoneNumber!: string;

  @ApiProperty({ enum: EnumUserRole })
  role!: EnumUserRole;

  @ApiProperty()
  isSeller!: boolean;

  @ApiProperty()
  isEmailConfirmed!: boolean;

  @ApiProperty()
  isPhoneNumberConfirmed!: boolean;

  @ApiProperty()
  isCountryConfirmed!: boolean;
}
