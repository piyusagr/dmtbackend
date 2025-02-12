import { CanActivate, ExecutionContext } from '@nestjs/common';
export declare class ContinentGuard implements CanActivate {
    constructor();
    canActivate(context: ExecutionContext): true | Promise<never>;
}
