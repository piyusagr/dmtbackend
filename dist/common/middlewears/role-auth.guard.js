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
exports.RoleAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const error_response_1 = require("../responses/error-response");
let RoleAuthGuard = class RoleAuthGuard {
    constructor(reflector) {
        this.reflector = reflector;
    }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        try {
            const requiredRoles = this.reflector.get('roles', context.getHandler());
            if (!requiredRoles || requiredRoles.length === 0) {
                return Promise.reject(new common_1.ForbiddenException('Forbidden'));
            }
            const userRole = request.user.role;
            if (requiredRoles.includes(userRole)) {
                return true;
            }
            return userRole;
        }
        catch (err) {
            console.log('err', err);
            error_response_1.ErrorResponse.sendErrorResponse(response, err);
        }
    }
};
exports.RoleAuthGuard = RoleAuthGuard;
exports.RoleAuthGuard = RoleAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [core_1.Reflector])
], RoleAuthGuard);
//# sourceMappingURL=role-auth.guard.js.map