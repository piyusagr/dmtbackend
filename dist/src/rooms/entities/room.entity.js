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
exports.RoomEntity = void 0;
const swagger_1 = require("@nestjs/swagger");
const create_room_dto_1 = require("../dto/create-room.dto");
const bed_entity_1 = require("./bed.entity");
const place_entity_1 = require("../../places/entities/place.entity");
class RoomEntity extends create_room_dto_1.CreateRoomDto {
    constructor(room) {
        super();
        Object.assign(this, room);
    }
}
exports.RoomEntity = RoomEntity;
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Number)
], RoomEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => [bed_entity_1.BedEntity] }),
    __metadata("design:type", Array)
], RoomEntity.prototype, "beds", void 0);
__decorate([
    (0, swagger_1.ApiProperty)(),
    __metadata("design:type", Date)
], RoomEntity.prototype, "createdAt", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ type: () => place_entity_1.PlaceEntity }),
    __metadata("design:type", Object)
], RoomEntity.prototype, "place", void 0);
//# sourceMappingURL=room.entity.js.map