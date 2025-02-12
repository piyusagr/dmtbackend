import { HttpStatus } from '@nestjs/common';

export class ErrorResponse {
  static sendErrorResponse(res: any, error: any) {
    console.log(`Error :  ${JSON.stringify(error)}`);

    let statusCode = error?.status
      ? error.status
      : HttpStatus.INTERNAL_SERVER_ERROR;
    const name = error?.name ? error.name : 'InternalServerError';
    let description = error?.response?.error
      ? error?.response?.error
      : 'Internal Server Error';

    if (
      error?.name == 'JsonWebTokenError' &&
      error?.message == 'jwt malformed'
    ) {
      statusCode = HttpStatus.UNAUTHORIZED;
    }

    if (error?.name == 'TokenExpiredError' && error?.message == 'jwt expired') {
      statusCode = HttpStatus.UNAUTHORIZED;
      description = 'Expired token';
    }

    res.status(statusCode).send({
      success: false,
      statusCode,
      name,
      description,
      error: error?.message ? error.message : error,
      data: null,
    });
  }
}
