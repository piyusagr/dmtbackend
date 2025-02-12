import { ArgumentsHost, ExceptionFilter, HttpException } from '@nestjs/common';
export declare class HttpExecptionFilter implements ExceptionFilter {
    private readonly logger;
    catch(exception: HttpException, host: ArgumentsHost): void;
}
