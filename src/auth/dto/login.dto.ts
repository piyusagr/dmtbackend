import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { ApiString } from '../../../common/decorators/swagger.decorators';
import { IsEmail } from 'class-validator';
import { Exactly } from '../../../helpers/type.helpers';

export class LoginDto implements Exactly<User, LoginDto> {
  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiString()
  password!: string;
}
