"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SuccessResponse = void 0;
class SuccessResponse {
    static sendSuccessResponse(res, statusCode, data, message) {
        res
            .status(statusCode)
            .send({
            success: true,
            statusCode,
            message,
            data,
        });
    }
}
exports.SuccessResponse = SuccessResponse;
//# sourceMappingURL=success-response.js.map