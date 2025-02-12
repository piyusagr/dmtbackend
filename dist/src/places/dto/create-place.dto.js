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
exports.CreatePlaceDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_decorators_1 = require("../../../common/decorators/swagger.decorators");
const related_action_helper_1 = require("../../../helpers/related-action.helper");
class CreatePlaceDto {
}
exports.CreatePlaceDto = CreatePlaceDto;
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.MinLength)(10),
    (0, swagger_decorators_1.ApiString)({ apiParams: { minLength: 10 } }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.IsEnum)(client_1.ListingStats),
    (0, swagger_1.ApiProperty)({ enum: client_1.ListingStats }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "listing_status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreatePlaceDto.prototype, "longitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.EnumBusinessNature),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "businessNature", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "individualNbr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "individualTaxIdNbr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "businessRegistrationNbr", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "businessTaxIdNbr", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "street", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "city", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "province", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "postal_code", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "country", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)({ optional: true, apiParams: { type: String } }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "subtitle", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)({ optional: true }),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "place_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: client_1.BookingPolicy }),
    (0, class_validator_1.IsEnum)(client_1.BookingPolicy),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreatePlaceDto.prototype, "booking_policy", void 0);
__decorate([
    (0, related_action_helper_1.TransformAssign)(),
    __metadata("design:type", Object)
], CreatePlaceDto.prototype, "images", void 0);
//# sourceMappingURL=create-place.dto.js.map