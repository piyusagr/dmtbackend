/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  BadRequestException,
  Injectable,
  Logger,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { DatabseError } from '../../common/errors/database.error';
import prisma from '../../config/db';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserStatusDto } from './dto/update-user-status.dto';
import { UserEntity } from './entities/user.entity';
import { EnumUserRole } from '@prisma/client';
import { JwtUtilityService } from '../../common/services/jwt/jwt-utility.service';
import { TwilioService } from '../../common/services/twilio/twilio.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly jwtUtilityService: JwtUtilityService,
    private readonly twilioService: TwilioService,
  ) {}

  async sendWhatsAppCode(user: UserEntity, country: string): Promise<any> {
    try {
      console.log(user.phoneNumber);

      const result = await this.twilioService.initiatePhoneNumberVerification(
        user.phoneNumber,
      );

      const status = result.status;
      const valid = result.valid;

      await this.updateCountry(user.id, country);

      return { status, valid };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async checkWhatsAppCode(user: UserEntity, code: string): Promise<any> {
    try {
      const result = await this.twilioService.confirmPhoneNumber(
        user.phoneNumber,
        code,
      );

      const status = result.status;
      const valid = result.valid;

      if (!valid || status !== 'approved') {
        return Promise.reject(
          new BadRequestException(
            `Wrong code provided. status : ${status} valid ${valid}`,
          ),
        );
      }

      await this.markPhoneNumberAsConfirmed(user.id);

      return { status, valid };
    } catch (e) {
      console.log(e);
      return Promise.reject(e);
    }
  }

  async switchUserRoleBuyerSeller(user: UserEntity): Promise<any> {
    try {
      if (user.role === EnumUserRole.BUYER) {
        user.role = EnumUserRole.SELLER;
        user.isSeller = true;
      } else if (user.role === EnumUserRole.SELLER) {
        user.role = EnumUserRole.BUYER;
        user.isSeller = false;
      } else {
        return Promise.reject(
          new UnauthorizedException('Unauthorized user role!'),
        );
      }

      const updateUser = await this.updateUserRole(
        user.id,
        user.role,
        user.isSeller,
      );

      const token = await this.jwtUtilityService.sign(updateUser);

      return { user: updateUser, token };
    } catch (e) {
      return Promise.reject(e);
    }
  }

  async updateUserRole(
    userId: number,
    role: EnumUserRole,
    isSeller: boolean,
  ): Promise<any> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          role,
          isSeller,
          updatedAt: new Date(),
        },
      });

      delete updatedUser.password;

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }

  async updateUserStatus(data: UpdateUserStatusDto): Promise<any> {
    try {
      const { userId, status } = data;

      const user = await this.findByUserId(userId);

      if (user.status === status) {
        return Promise.reject(
          new BadRequestException(`User already in ${status} status!`),
        );
      }

      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          status,
          updatedAt: new Date(),
        },
      });

      delete updatedUser.password;

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }

  async updateCountry(userId: number, country: string): Promise<any> {
    try {
      const updatedUser = await prisma.user.update({
        where: { id: userId },
        data: {
          country,
          updatedAt: new Date(),
        },
      });

      delete updatedUser.password;

      return updatedUser;
    } catch (e) {
      throw e;
    }
  }

  async create(data: any) {
    return prisma.user.create({ data });
  }

  async markEmailAsConfirmed(email: string) {
    return prisma.user.update({
      where: { email },
      data: {
        isEmailConfirmed: true,
        updatedAt: new Date(),
      },
    });
  }

  async getById(user_id: number) {
    return prisma.user.findFirst({
      where: { id: Number(user_id) },
    });
  }

  async getByEmail(email: string) {
    return prisma.user.findFirst({
      where: { email },
    });
  }

  async getByEmailAndToken(email: string, emailVerifyToken: string) {
    return prisma.user.findFirst({
      where: { email, emailVerifyToken },
    });
  }

  async findAll() {
    try {
      const users = await prisma.user.findMany({});

      return users.map((user) => {
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      });
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async findByUserId(id: number) {
    try {
      const user = await prisma.user.findFirst({
        where: { id: id },
      });

      if (!user) {
        return Promise.reject(new NotFoundException('User not found'));
      }

      return user;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const updateData: any = { ...updateUserDto };

      if (updateUserDto.email) {
        updateData['isEmailConfirmed'] = false;
      }

      if (updateUserDto.phoneNumber) {
        updateData['isPhoneNumberConfirmed'] = false;
      }

      const user = await prisma.user.update({
        where: { id },
        data: updateData,
      });

      delete user['password'];

      return user;
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async markPhoneNumberAsConfirmed(id: number) {
    try {
      return await prisma.user.update({
        where: { id },
        data: {
          isPhoneNumberConfirmed: true,
          isCountryConfirmed: true,
          updatedAt: new Date(),
        },
      });
    } catch (error) {
      throw new DatabseError(error);
    }
  }

  async remove(id: number) {
    try {
      return await prisma.user.delete({
        where: { id },
      });
    } catch (error) {
      throw new DatabseError(error);
    }
  }
}
