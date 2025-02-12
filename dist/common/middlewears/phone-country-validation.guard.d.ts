import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class PhoneCountryValidationGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): true | Promise<never>;
}
