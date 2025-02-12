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
exports.ContinentGuard = void 0;
const common_1 = require("@nestjs/common");
const error_response_1 = require("../responses/error-response");
const countryContinentArray = require("../constants/country-by-continent.json");
let ContinentGuard = class ContinentGuard {
    constructor() { }
    canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const response = context.switchToHttp().getResponse();
        try {
            if (!request.user) {
                return Promise.reject(new common_1.UnauthorizedException('User is not found!'));
            }
            const user = request.user;
            if (!user.country) {
                return Promise.reject(new common_1.UnprocessableEntityException('Country is not found for user!'));
            }
            const continentData = countryContinentArray.find((item) => item.country === user.country);
            if (continentData.continent !== 'Asia' &&
                continentData.continent !== 'Africa') {
                return Promise.reject(new common_1.ForbiddenException('Country is not allowed!'));
            }
            return true;
        }
        catch (err) {
            error_response_1.ErrorResponse.sendErrorResponse(response, err);
        }
    }
};
exports.ContinentGuard = ContinentGuard;
exports.ContinentGuard = ContinentGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], ContinentGuard);
//# sourceMappingURL=continent.guard.js.map