import { HttpException } from '@nestjs/common';
export declare class DatabseError extends HttpException {
    constructor(error: unknown);
}
