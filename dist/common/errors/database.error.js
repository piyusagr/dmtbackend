"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabseError = void 0;
const common_1 = require("@nestjs/common");
const library_1 = require("@prisma/client/runtime/library");
class DatabseError extends common_1.HttpException {
    constructor(error) {
        const DEFAULT_MESSAGE = 'Unknown database error occured.';
        let errorMessage;
        if (error instanceof library_1.PrismaClientKnownRequestError) {
            errorMessage = getPrismaErrorMessage(error) || DEFAULT_MESSAGE;
        }
        super({ message: errorMessage, meta: error }, common_1.HttpStatus.BAD_GATEWAY);
    }
}
exports.DatabseError = DatabseError;
const getPrismaErrorMessage = (error) => {
    const prismaError = Object.entries(PRISMA_KNOWN_ERRORS).find(([key, { code, message }]) => {
        return error.code === code;
    });
    if (!prismaError)
        return;
    const [key, { code, message }] = prismaError;
    if (message instanceof Function) {
        return message(error);
    }
    return prismaError?.[1].message;
};
const PRISMA_ERORR_TYPE = ['forgienKeyFailure'];
const PRISMA_KNOWN_ERRORS = {
    forgienKeyFailure: {
        code: 'P2003',
        message: (error) => `Forgien key failure`,
    },
};
//# sourceMappingURL=database.error.js.map