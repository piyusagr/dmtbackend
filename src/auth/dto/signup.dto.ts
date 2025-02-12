import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsEmail, IsString } from 'class-validator';
import { ApiString } from '../../../common/decorators/swagger.decorators';
import { Exactly } from '../../../helpers/type.helpers';

export class SignUpDto implements Exactly<User, SignUpDto> {
  @ApiString()
  firstName!: string;

  @ApiString()
  lastName!: string;

  @ApiProperty()
  @IsEmail()
  email!: string;

  @ApiString({apiParams: {title: "Password", writeOnly: true}})
  password!: string;

  @ApiProperty({type: String})
  @IsString()
  phoneNumber!: string | null;
}
