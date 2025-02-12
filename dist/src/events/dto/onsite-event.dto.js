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
exports.OnsiteEventDTO = void 0;
const class_validator_1 = require("class-validator");
const client_1 = require("@prisma/client");
const swagger_1 = require("@nestjs/swagger");
const date_ranges_dto_1 = require("./date-ranges.dto");
const class_transformer_1 = require("class-transformer");
class OnsiteEventDTO {
}
exports.OnsiteEventDTO = OnsiteEventDTO;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => date_ranges_dto_1.DateRangesDTO),
    __metadata("design:type", Array)
], OnsiteEventDTO.prototype, "dateRanges", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OnsiteEventDTO.prototype, "extraAmount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.EnumPrivateGroupHosting),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OnsiteEventDTO.prototype, "privateGroupHosting", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], OnsiteEventDTO.prototype, "privateGroupHostingCharge", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.EnumTransferService),
    __metadata("design:type", String)
], OnsiteEventDTO.prototype, "transferService", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnsiteEventDTO.prototype, "latitude", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnsiteEventDTO.prototype, "longitude", void 0);
//# sourceMappingURL=onsite-event.dto.js.map