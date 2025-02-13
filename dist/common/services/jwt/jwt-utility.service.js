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
exports.JwtUtilityService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
let JwtUtilityService = class JwtUtilityService {
    constructor(jwtService, configService) {
        this.jwtService = jwtService;
        this.configService = configService;
    }
    async sign(payload) {
        try {
            const expirationTime = this.configService.get('JWT_VERIFICATION_TOKEN_EXPIRATION_TIME');
            const expiresIn = typeof expirationTime === 'number'
                ? `${expirationTime}s`
                : expirationTime;
            return this.jwtService.sign(payload, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
                expiresIn,
            });
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
    async verify(token) {
        try {
            const isVerified = await this.jwtService.verify(token, {
                secret: this.configService.get('JWT_VERIFICATION_TOKEN_SECRET'),
            });
            return isVerified;
        }
        catch (e) {
            console.error(e);
            throw e;
        }
    }
};
exports.JwtUtilityService = JwtUtilityService;
exports.JwtUtilityService = JwtUtilityService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        config_1.ConfigService])
], JwtUtilityService);
//# sourceMappingURL=jwt-utility.service.js.map