"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpExecptionFilter = void 0;
const common_1 = require("@nestjs/common");
let HttpExecptionFilter = class HttpExecptionFilter {
    constructor() {
        this.logger = new common_1.Logger(common_1.HttpException.name);
    }
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const request = ctx.getRequest();
        const response = ctx.getResponse();
        const statusCode = exception.getStatus();
        const responseData = exception.getResponse();
        const isOperational = statusCode < 500;
        this.logger.error(`${statusCode} ${exception.name} ${exception.message}`);
        let responseObject = {
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
};
exports.HttpExecptionFilter = HttpExecptionFilter;
exports.HttpExecptionFilter = HttpExecptionFilter = __decorate([
    (0, common_1.Catch)(common_1.HttpException)
], HttpExecptionFilter);
//# sourceMappingURL=exepection-handler.filter.js.map