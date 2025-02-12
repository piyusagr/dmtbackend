"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateAuthDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const signup_dto_1 = require("./signup.dto");
class UpdateAuthDto extends (0, mapped_types_1.PartialType)(signup_dto_1.SignUpDto) {
}
exports.UpdateAuthDto = UpdateAuthDto;
//# sourceMappingURL=update-auth.dto.js.map