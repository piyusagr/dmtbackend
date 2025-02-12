import { ValidatorConstraintInterface, ValidationOptions } from 'class-validator';
export declare class IsDecimalConstraint implements ValidatorConstraintInterface {
    validate(value: any): boolean;
    defaultMessage(): string;
}
export declare function IsDecimalNumber(validationOptions?: ValidationOptions): (object: unknown, propertyName: string) => void;
