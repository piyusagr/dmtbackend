import {
  Injectable,
  CanActivate,
  ExecutionContext,
  // ForbiddenException,
  UnauthorizedException,
} from '@nestjs/common';
import { ErrorResponse } from '../responses/error-response';

@Injectable()
export class PhoneCountryValidationGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      if (!request.user) {
        return Promise.reject(new UnauthorizedException('User is not found!'));
      }

      // const user = request.user;

      // if (!user.isPhoneNumberConfirmed || !user.isCountryConfirmed) {
      //   return Promise.reject(
      //     new ForbiddenException('Phone number or country is unverified!'),
      //   );
      // }

      return true;
    } catch (err) {
      ErrorResponse.sendErrorResponse(response, err);
    }
  }
}
