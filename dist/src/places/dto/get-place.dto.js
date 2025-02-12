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
exports.GetPlaceQueryDto = void 0;
const swagger_decorators_1 = require("../../../common/decorators/swagger.decorators");
class GetPlaceQueryDto {
    constructor() {
        this.rooms = false;
        this.reviews = false;
        this.bookings = false;
        this._count = false;
    }
}
exports.GetPlaceQueryDto = GetPlaceQueryDto;
__decorate([
    (0, swagger_decorators_1.IsIncludeQuery)(),
    __metadata("design:type", Boolean)
], GetPlaceQueryDto.prototype, "rooms", void 0);
__decorate([
    (0, swagger_decorators_1.IsIncludeQuery)(),
    __metadata("design:type", Boolean)
], GetPlaceQueryDto.prototype, "reviews", void 0);
__decorate([
    (0, swagger_decorators_1.IsIncludeQuery)(),
    __metadata("design:type", Boolean)
], GetPlaceQueryDto.prototype, "bookings", void 0);
__decorate([
    (0, swagger_decorators_1.IsIncludeQuery)(),
    __metadata("design:type", Boolean)
], GetPlaceQueryDto.prototype, "_count", void 0);
//# sourceMappingURL=get-place.dto.js.map