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
exports.PlaceImagesEntity = exports.PlaceActiveEntity = exports.RoomPriceEntity = exports.PlaceEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const asset_entity_1 = require("../../assets/entities/asset.entity");
const room_entity_1 = require("../../rooms/entities/room.entity");
const create_place_dto_1 = require("../dto/create-place.dto");
class PlaceCountEntity {
}
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlaceCountEntity.prototype, "rooms", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlaceCountEntity.prototype, "bookings", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlaceCountEntity.prototype, "reviews", void 0);
class PlaceEntity extends (0, swagger_1.OmitType)(create_place_dto_1.CreatePlaceDto, ['images']) {
    constructor(place) {
        super();
        Object.assign(this, place);
    }
}
exports.PlaceEntity = PlaceEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlaceEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], PlaceEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], PlaceEntity.prototype, "rating", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", PlaceCountEntity)
], PlaceEntity.prototype, "_count", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [asset_entity_1.AssetEntity] }),
    __metadata("design:type", Array)
], PlaceEntity.prototype, "images", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => asset_entity_1.AssetEntity }),
    __metadata("design:type", Array)
], PlaceEntity.prototype, "cover_image", void 0);
class RoomPriceEntity extends (0, swagger_1.PickType)(room_entity_1.RoomEntity, ['price']) {
}
exports.RoomPriceEntity = RoomPriceEntity;
class PlaceActiveEntity extends PlaceEntity {
}
exports.PlaceActiveEntity = PlaceActiveEntity;
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => RoomPriceEntity, isArray: true }),
    __metadata("design:type", Array)
], PlaceActiveEntity.prototype, "rooms", void 0);
class PlaceImagesEntity extends (0, swagger_1.PickType)(PlaceEntity, [
    'images',
    'cover_image',
]) {
}
exports.PlaceImagesEntity = PlaceImagesEntity;
//# sourceMappingURL=place.entity.js.map