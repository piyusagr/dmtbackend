import { HttpException, HttpStatus } from '@nestjs/common';

export class ApiError extends HttpException {
  constructor(public message: string = 'API·Error') {
    super(message, HttpStatus.BAD_REQUEST);
  }
}
