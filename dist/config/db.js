"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectToDatabase = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const logger = new common_1.Logger('DATABSE');
const connectToDatabase = async () => {
    try {
        await prisma.$connect();
        logger.log('Databse connection established sucessfully. 📑');
    }
    catch (error) {
        logger.error('Databse connection failed.', error);
        process.exit(1);
    }
};
exports.connectToDatabase = connectToDatabase;
(0, exports.connectToDatabase)();
exports.default = prisma;
//# sourceMappingURL=db.js.map