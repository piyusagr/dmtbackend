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
exports.UpdateRoomDto = exports.UpdateBedDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const create_room_dto_1 = require("./create-room.dto");
class UpdateBedDto extends (0, swagger_1.PartialType)(create_room_dto_1.CreateBedDto) {
}
exports.UpdateBedDto = UpdateBedDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    (0, swagger_1.ApiPropertyOptional)(),
    __metadata("design:type", Number)
], UpdateBedDto.prototype, "id", void 0);
class UpdateRoomDto extends (0, swagger_1.PartialType)((0, swagger_1.OmitType)(create_room_dto_1.CreateRoomDto, ['beds'])) {
}
exports.UpdateRoomDto = UpdateRoomDto;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: () => [Number] }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNumber)({ allowNaN: false }, { each: true }),
    __metadata("design:type", Array)
], UpdateRoomDto.prototype, "delete_bed_ids", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [UpdateBedDto] }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => UpdateBedDto),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ArrayMinSize)(1),
    __metadata("design:type", Array)
], UpdateRoomDto.prototype, "beds", void 0);
//# sourceMappingURL=update-room.dto.js.map