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
exports.CreateRoomDto = exports.CreateBedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const client_1 = require("@prisma/client");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const swagger_decorators_1 = require("../../../common/decorators/swagger.decorators");
class CreateBedDto {
}
exports.CreateBedDto = CreateBedDto;
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2),
    __metadata("design:type", String)
], CreateBedDto.prototype, "bed_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateBedDto.prototype, "amount", void 0);
class CreateRoomDto {
}
exports.CreateRoomDto = CreateRoomDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "place_id", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "price", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "stock", void 0);
__decorate([
    (0, swagger_decorators_1.ApiString)(),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "room_type", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [CreateBedDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => CreateBedDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], CreateRoomDto.prototype, "beds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => value === 'true'),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreateRoomDto.prototype, "isDiscountAvailable", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((o) => o.isDiscountAvailable === true),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "discount", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsEnum)(client_1.EnumTransferService),
    __metadata("design:type", String)
], CreateRoomDto.prototype, "transferService", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_transformer_1.Transform)(({ value }) => parseFloat(value)),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.ValidateIf)((o) => o.transferService === client_1.EnumTransferService.EXTRA_COST),
    __metadata("design:type", Number)
], CreateRoomDto.prototype, "extraAmount", void 0);
//# sourceMappingURL=create-room.dto.js.map