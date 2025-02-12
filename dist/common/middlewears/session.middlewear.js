"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSession = void 0;
const session = require("express-session");
const prisma_session_store_1 = require("@quixo3/prisma-session-store");
const db_1 = require("../../config/db");
const prismaSessionStore = new prisma_session_store_1.PrismaSessionStore(db_1.default, {
    checkPeriod: 2 * 60 * 1000,
});
exports.userSession = session({
    secret: 'dawkdm123149ad',
    cookie: {
        maxAge: 7 * 24 * 60 * 60 * 1000,
    },
    store: prismaSessionStore,
    resave: false,
    saveUninitialized: false,
});
//# sourceMappingURL=session.middlewear.js.map