"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
const common_1 = require("@nestjs/common");
class ApiError extends common_1.HttpException {
    constructor(message = 'API·Error') {
        super(message, common_1.HttpStatus.BAD_REQUEST);
        this.message = message;
    }
}
exports.ApiError = ApiError;
//# sourceMappingURL=api.error.js.map