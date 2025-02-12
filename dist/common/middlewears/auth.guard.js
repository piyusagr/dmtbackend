"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const common_2 = require("@nestjs/common");
const jwt_utility_service_1 = require("../services/jwt/jwt-utility.service");
const users_service_1 = require("../../src/users/users.service");
const error_response_1 = require("../responses/error-response");
const client_1 = require("@prisma/client");
let AuthGuard = class AuthGuard {
    constructor(jwtUtilityService, usersService) {
        this.jwtUtilityService = jwtUtilityService;
        this.usersService = usersService;
    }
    async canActivate(context) {
        const response = context.switchToHttp().getResponse();
        const request = context.switchToHttp().getRequest();
        try {
            const authorizationHeader = request.headers['authorization'];
            const user_id = request.headers['user_id'];
            if (!authorizationHeader || !authorizationHeader.startsWith('Bearer ')) {
                return Promise.reject(new common_2.UnauthorizedException('Unauthorized: Bearer token missing!'));
            }
            const user = await this.usersService.getById(user_id);
            if (!user) {
                return Promise.reject(new common_1.UnprocessableEntityException('Unauthorized: User not found!'));
            }
            if (user.status == client_1.EnumUserStatus.BLOCKED) {
                return Promise.reject(new common_1.UnprocessableEntityException('Unauthorized: User is BLOCKED!'));
            }
            request.user = user;
            return true;
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(response, err);
        }
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_utility_service_1.JwtUtilityService,
        users_service_1.UsersService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map