"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorResponse = void 0;
const common_1 = require("@nestjs/common");
class ErrorResponse {
    static sendErrorResponse(res, error) {
        console.log(`Error :  ${JSON.stringify(error)}`);
        let statusCode = error?.status
            ? error.status
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const name = error?.name ? error.name : 'InternalServerError';
        let description = error?.response?.error
            ? error?.response?.error
            : 'Internal Server Error';
        if (error?.name == 'JsonWebTokenError' &&
            error?.message == 'jwt malformed') {
            statusCode = common_1.HttpStatus.UNAUTHORIZED;
        }
        if (error?.name == 'TokenExpiredError' && error?.message == 'jwt expired') {
            statusCode = common_1.HttpStatus.UNAUTHORIZED;
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
exports.ErrorResponse = ErrorResponse;
//# sourceMappingURL=error-response.js.map