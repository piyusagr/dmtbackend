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
exports.OnlineEventReviewCreateDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class OnlineEventReviewCreateDto {
}
exports.OnlineEventReviewCreateDto = OnlineEventReviewCreateDto;
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnlineEventReviewCreateDto.prototype, "eventListingId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnlineEventReviewCreateDto.prototype, "eventId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], OnlineEventReviewCreateDto.prototype, "eventRequestId", void 0);
__decorate([
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnlineEventReviewCreateDto.prototype, "sellerCommunication", void 0);
__decorate([
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnlineEventReviewCreateDto.prototype, "serviceQuality", void 0);
__decorate([
    (0, class_validator_1.Max)(10),
    (0, class_validator_1.Min)(1),
    (0, swagger_1.ApiProperty)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], OnlineEventReviewCreateDto.prototype, "valueForMoney", void 0);
//# sourceMappingURL=online-event-review-create.dto.js.map