import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import type { Request } from 'express';

@Catch(HttpException)
export class HttpExecptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(HttpException.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse();

    const statusCode = exception.getStatus();
    const responseData = exception.getResponse();
    const isOperational = statusCode < 500;

    this.logger.error(`${statusCode} ${exception.name} ${exception.message}`);

    let responseObject: object = {
      statusCode,
      name: exception.name,
      path: request.url,
      isOperational,
    };

    responseObject = {
      ...responseObject,
      message: exception.message,
    };

    if (responseData instanceof Object)
      Object.assign(responseObject, responseData);

    response.status(statusCode).json(responseObject);
  }
}
