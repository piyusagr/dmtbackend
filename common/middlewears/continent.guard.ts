import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  UnauthorizedException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ErrorResponse } from '../responses/error-response';
import * as countryContinentArray from '../constants/country-by-continent.json';

@Injectable()
export class ContinentGuard implements CanActivate {
  constructor() {}

  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    try {
      if (!request.user) {
        return Promise.reject(new UnauthorizedException('User is not found!'));
      }

      const user = request.user;

      if (!user.country) {
        return Promise.reject(
          new UnprocessableEntityException('Country is not found for user!'),
        );
      }

      const continentData = countryContinentArray.find(
        (item) => item.country === user.country,
      );

      if (
        continentData.continent !== 'Asia' &&
        continentData.continent !== 'Africa'
      ) {
        return Promise.reject(
          new ForbiddenException('Country is not allowed!'),
        );
      }

      return true;
    } catch (err) {
      ErrorResponse.sendErrorResponse(response, err);
    }
  }
}
