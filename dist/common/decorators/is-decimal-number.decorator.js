"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsDecimalConstraint = void 0;
exports.IsDecimalNumber = IsDecimalNumber;
const class_validator_1 = require("class-validator");
let IsDecimalConstraint = class IsDecimalConstraint {
    validate(value) {
        if (value === undefined || value === null) {
            return false;
        }
        const regex = /^[+-]?([0-9]*[.])?[0-9]+$/;
        return regex.test(value.toString());
    }
    defaultMessage() {
        return 'Invalid decimal number';
    }
};
exports.IsDecimalConstraint = IsDecimalConstraint;
exports.IsDecimalConstraint = IsDecimalConstraint = __decorate([
    (0, class_validator_1.ValidatorConstraint)({ name: 'isDecimalNumber', async: false })
], IsDecimalConstraint);
function IsDecimalNumber(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: IsDecimalConstraint,
        });
    };
}
//# sourceMappingURL=is-decimal-number.decorator.js.map