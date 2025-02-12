import { HttpException } from '@nestjs/common';
export declare class ApiError extends HttpException {
    message: string;
    constructor(message?: string);
}
