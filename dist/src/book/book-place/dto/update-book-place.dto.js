"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateBookPlaceDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_book_place_dto_1 = require("./create-book-place.dto");
class UpdateBookPlaceDto extends (0, mapped_types_1.PartialType)(create_book_place_dto_1.CreatePlaceBookingDto) {
}
exports.UpdateBookPlaceDto = UpdateBookPlaceDto;
//# sourceMappingURL=update-book-place.dto.js.map