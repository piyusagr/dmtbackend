/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  Logger,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import prisma from '../../config/db';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { ApiError } from '../../common/errors/api.error';
import {
  ConfirmEmailDto,
  SignInWithGoogleDto,
  SignUpWithEmailDto,
} from './dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { PRISMA_ERROR } from '../../common/constants/prisma-error.constant';
import { ConfigService } from '@nestjs/config';
import { UsersService } from '../users/users.service';
import { DmtNodemailerEmailService } from '../../common/services/email/dmt-nodemailer-email.service';
import { OAuth2Client } from 'google-auth-library';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { EnumUserStatus } from '@prisma/client';

@Injectable()
export class AuthService {
  private client: any;
  private logger = new Logger(AuthService.name);

  constructor(
    private readonly dmtNodemailerEmailService: DmtNodemailerEmailService,
    private readonly configService: ConfigService,
    private readonly jwtUtilityService: JwtUtilityService,
    private readonly usersService: UsersService,
  ) {
    this.client = new OAuth2Client(
      this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
      this.configService.get('GOOGLE_AUTH_CLIENT_SECRET'),
    );
  }

  // new - ganesh

  async signInWithGoogle(data: SignInWithGoogleDto) {
    try {
      const ticket = await this.client.verifyIdToken({
        idToken: data.token,
        audience: this.configService.get('GOOGLE_AUTH_CLIENT_ID'),
      });

      const { email, name } = ticket.getPayload();

      let user = await this.usersService.getByEmail(email);

      if (!user) {
        user = await this.usersService.create({
          email,
          firstName: name,
          lastName: name,
        });
      }

      const { password, ...userData } = user;

      return await this.jwtUtilityService.sign(userData);
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async signUpWithEmail(data: SignUpWithEmailDto) {
    try {
      const password = await bcrypt.hash(data.password, 10);

      const user = await prisma.user.create({
        data: {
          ...data,
          password,
        },
      });

      delete user.password;

      const emailVerifyToken =
        await this.dmtNodemailerEmailService.sendVerificationLink(data.email);

      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerifyToken, updatedAt: new Date() },
      });

      const token = await this.jwtUtilityService.sign(user);
      return { user, token };
    } catch (e) {
      if (e instanceof PrismaClientKnownRequestError) {
        if (e.code === PRISMA_ERROR.uniqueConstriant)
          throw new ApiError('Email address must be unique');
      }

      throw e;
    }
  }

  async resendEmailConfirmation(email: string) {
    try {
      const user = await this.usersService.getByEmail(email);

      if (!user) {
        return Promise.reject(
          new BadRequestException('User not found. Cannot send verify email!'),
        );
      }

      if (user.isEmailConfirmed) {
        return Promise.reject(
          new BadRequestException('Email already confirmed'),
        );
      }

      const emailVerifyToken =
        await this.dmtNodemailerEmailService.sendVerificationLink(user.email);

      await prisma.user.update({
        where: { id: user.id },
        data: { emailVerifyToken, updatedAt: new Date() },
      });
    } catch (e) {
      console.error(e);
      throw e;
    }
  }

  async emailConfirmation({ token }: ConfirmEmailDto) {
    try {
      const payload = await this.jwtUtilityService.verify(token);

      this.logger.log(
        `emailConfirmation - payload - ${JSON.stringify(payload)}`,
      );

      if (typeof payload === 'object' && 'email' in payload) {
        const user = await this.usersService.getByEmail(payload.email);

        if (!user) {
          return Promise.reject(
            new UnprocessableEntityException(
              'User not found. Cannot confirm email!',
            ),
          );
        }

        if (user.isEmailConfirmed) {
          return Promise.reject(
            new BadRequestException('Email already confirmed'),
          );
        }

        if (user.emailVerifyToken !== token) {
          return Promise.reject(new BadRequestException('Invalid token!'));
        }

        await this.usersService.markEmailAsConfirmed(payload.email);
      } else {
        return Promise.reject(
          new BadRequestException('Token verification has been failed!'),
        );
      }
    } catch (e) {
      console.error(e);

      if (e?.name === 'TokenExpiredError') {
        return Promise.reject(
          new BadRequestException('Email confirmation token expired'),
        );
      }

      if (e?.name == 'JsonWebTokenError' && e?.message == 'invalid signature') {
        return Promise.reject(new BadRequestException('Invalid token!'));
      }

      return Promise.reject(e);
    }
  }

  async forgotPassword(email: string) {
    try {
      const user = await this.usersService.getByEmail(email);

      if (!user) {
        return Promise.reject(
          new BadRequestException(
            'User not found. Cannot send reset password email!',
          ),
        );
      }

      const passwordResetToken =
        await this.dmtNodemailerEmailService.sendResetPasswordEmail(user.email);

      await prisma.user.update({
        where: { id: user.id },
        data: { passwordResetToken, updatedAt: new Date() },
      });
    } catch (e) {
      console.error(e);
      return Promise.reject(e);
    }
  }

  async resetPassword(token: string, password: string) {
    try {
      const payload = await this.jwtUtilityService.verify(token);

      this.logger.log(`resetPassword - payload - ${JSON.stringify(payload)}`);

      if (typeof payload === 'object' && 'email' in payload) {
        const user = await this.usersService.getByEmail(payload.email);

        if (!user) {
          return Promise.reject(
            new BadRequestException(
              'Invalid token!. User not found. Cannot reset password!',
            ),
          );
        }

        if (user.passwordResetToken !== token) {
          return Promise.reject(new BadRequestException('Invalid token!'));
        }

        password = await bcrypt.hash(password, 10);

        await prisma.user.update({
          where: { id: user.id },
          data: { password, updatedAt: new Date() },
        });
      } else {
        return Promise.reject(
          new BadRequestException('Token verification has been failed!'),
        );
      }
    } catch (e) {
      console.error(e);

      if (e?.name === 'TokenExpiredError') {
        return Promise.reject(
          new BadRequestException('Password reset token expired'),
        );
      }

      if (e?.name == 'JsonWebTokenError' && e?.message == 'invalid signature') {
        return Promise.reject(new BadRequestException('Invalid token!'));
      }

      return Promise.reject(e);
    }
  }

  // existed

  async login(loginDto: LoginDto) {
    const user = await prisma.user.findFirst({
      where: {
        email: loginDto.email,
      },
    });

    if (!user) throw new ApiError('User does not exist');

    if (user.status == EnumUserStatus.BLOCKED) {
      throw new UnauthorizedException('Unauthorized: User is BLOCKED!');
    }

    if (!user.isEmailConfirmed) {
      throw new UnauthorizedException(
        'Unauthorized: Please verify your email!',
      );
    }

    const isValidPassword = await bcrypt.compare(
      loginDto.password,
      user.password,
    );
    if (!isValidPassword)
      throw new UnauthorizedException('Invalid password, please try again.');

    delete user.password;

    const token = await this.jwtUtilityService.sign(user);

    return { user, token };
  }
}
