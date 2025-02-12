import { CanActivate, ExecutionContext } from '@nestjs/common';
import { JwtUtilityService } from '../services/jwt/jwt-utility.service';
import { UsersService } from '../../src/users/users.service';
export declare class AuthGuard implements CanActivate {
    private readonly jwtUtilityService;
    private readonly usersService;
    constructor(jwtUtilityService: JwtUtilityService, usersService: UsersService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
