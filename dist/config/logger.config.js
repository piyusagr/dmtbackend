"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLoggerOptions = void 0;
const configuration_1 = require("./configuration");
const getLoggerOptions = () => {
    const isDev = (0, configuration_1.default)().isDevelopment;
    if (isDev)
        return ['debug', 'error', 'log', 'warn', 'verbose'];
    return ['error', 'warn'];
};
exports.getLoggerOptions = getLoggerOptions;
//# sourceMappingURL=logger.config.js.map