import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnprocessableEntityException,
} from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { JwtUtilityService } from '../services/jwt/jwt-utility.service';
import { UsersService } from '../../src/users/users.service';
import { ErrorResponse } from '../responses/error-response';
import { EnumUserStatus } from '@prisma/client';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtUtilityService: JwtUtilityService,
    private readonly usersService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const response = context.switchToHttp().getResponse();
    const request = context.switchToHttp().getRequest();

    try {
      const authorizationHeader = request.headers['authorization'];
      const user_id = request.headers['user_id'];

      if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
        return Promise.reject(
          new UnauthorizedException('Unauthorized: Bearer token missing!'),
        );
      }

      // const payload = await this.jwtUtilityService.verify(token);

      const user = await this.usersService.getById(user_id);

      if (!user) {
        return Promise.reject(
          new UnprocessableEntityException('Unauthorized: User not found!'),
        );
      }

      if (user.status == EnumUserStatus.BLOCKED) {
        return Promise.reject(
          new UnprocessableEntityException('Unauthorized: User is BLOCKED!'),
        );
      }

      request.user = user;

      return true;
    } catch (err) {
      ErrorResponse.sendErrorResponse(response, err);
    }
  }
}
