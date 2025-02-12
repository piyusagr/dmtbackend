"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsIncludeQuery = exports.ApiString = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const ApiString = (params) => {
    let decorators = [];
    decorators = params?.optional
        ? [...decorators, (0, swagger_1.ApiPropertyOptional)(params?.apiParams), (0, class_validator_1.IsOptional)()]
        : [...decorators, (0, swagger_1.ApiProperty)(params?.apiParams)];
    return (0, common_1.applyDecorators)((0, class_validator_1.IsString)(params?.stringParams), ...decorators);
};
exports.ApiString = ApiString;
const IsIncludeQuery = () => {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiPropertyOptional)(), (0, class_validator_1.IsBoolean)(), (0, class_transformer_1.Transform)(({ value }) => !!value), (0, class_validator_1.IsOptional)());
};
exports.IsIncludeQuery = IsIncludeQuery;
//# sourceMappingURL=swagger.decorators.js.map