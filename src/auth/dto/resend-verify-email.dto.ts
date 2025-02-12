import { IsNotEmpty, IsEmail } from 'class-validator';

export class ResendVerifyEmailDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
