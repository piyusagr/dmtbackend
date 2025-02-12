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
exports.TransformAssign = exports.RelatedAction = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const zod_1 = require("zod");
const api_error_1 = require("../common/errors/api.error");
class RelatedAction {
}
exports.RelatedAction = RelatedAction;
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    __metadata("design:type", Array)
], RelatedAction.prototype, "connect", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ type: [Number] }),
    __metadata("design:type", Array)
], RelatedAction.prototype, "disconnect", void 0);
const relatedActionSchema = zod_1.z
    .object({
    connect: zod_1.z.array(zod_1.z.number()).optional(),
    disconnect: zod_1.z.array(zod_1.z.number()).optional(),
})
    .strict()
    .refine((data) => !!Object.values(data).length)
    .or(zod_1.z.array(zod_1.z.number()));
const isValidRelatedAction = (value) => {
    const data = relatedActionSchema.safeParse(value);
    return data.success;
};
const getRelatedActionReturn = (values) => {
    if (!Array.isArray(values)) {
        const actionsObject = {};
        if (values?.connect)
            actionsObject.connect = values.connect.map((id) => ({ id }));
        if (values?.disconnect)
            actionsObject.disconnect = values.disconnect.map((id) => ({
                id,
            }));
        return actionsObject;
    }
    return {
        connect: values.map((id) => ({
            id,
        })),
    };
};
const TransformAssign = () => {
    return (0, common_1.applyDecorators)((0, class_validator_1.IsOptional)(), (0, swagger_1.ApiProperty)({
        oneOf: [
            { $ref: (0, swagger_1.getSchemaPath)(RelatedAction) },
            { type: 'array', items: { type: 'number' } },
        ],
    }), (0, class_transformer_1.Transform)(({ value, key }) => {
        const isValid = isValidRelatedAction(value);
        if (!isValid)
            throw new api_error_1.ApiError(`Invalid value for ${key}. Must be an array of numbers, or {connect?: number[], disconnect?: number[]}`);
        return getRelatedActionReturn(value);
    }, { toPlainOnly: true }));
};
exports.TransformAssign = TransformAssign;
//# sourceMappingURL=related-action.helper.js.map