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
exports.UserAndTokenResponseDto = void 0;
const class_validator_1 = require("class-validator");
const general_response_dto_1 = require("../../../common/responses/general-response.dto");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
const user_response_dto_1 = require("./user-response.dto");
class UserAndTokenResponse {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UserAndTokenResponse.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => user_response_dto_1.UserResponse),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", user_response_dto_1.UserResponse)
], UserAndTokenResponse.prototype, "user", void 0);
class UserAndTokenResponseDto extends general_response_dto_1.GeneralResponseDto {
}
exports.UserAndTokenResponseDto = UserAndTokenResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Type)(() => UserAndTokenResponse),
    (0, class_validator_1.ValidateNested)(),
    __metadata("design:type", UserAndTokenResponse)
], UserAndTokenResponseDto.prototype, "data", void 0);
//# sourceMappingURL=user-and-token-response.dto.js.map