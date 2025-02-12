import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { EnumUserRole } from '@prisma/client';
import { ErrorResponse } from '../responses/error-response';

@Injectable()
export class RoleAuthGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      const requiredRoles = this.reflector.get<EnumUserRole[]>(
        'roles',
        context.getHandler(),
      );

      if (!requiredRoles || requiredRoles.length === 0) {
        return Promise.reject(new ForbiddenException('Forbidden'));
      }

      const userRole = request.user.role;

      if (requiredRoles.includes(userRole)) {
        return true; // User has one of the required roles, access is allowed
      }

      // return Promise.reject(
      //   new ForbiddenException(
      //     `Forbidden! Provided Role : ${
      //       request.user.role
      //     }. Allowed Roles : ${requiredRoles.toString()}.`,
      //   ),
      // );

      return userRole;
    } catch (err) {
      console.log('err', err);
      ErrorResponse.sendErrorResponse(response, err);
    }
  }
}
