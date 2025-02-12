import { ValidationOptions, ValidatorConstraintInterface } from 'class-validator';
export declare class TimeFormatValidator implements ValidatorConstraintInterface {
    validate(time: string): boolean;
    defaultMessage(): string;
}
export declare function IsTimeFormat(validationOptions?: ValidationOptions): (object: Object, propertyName: string) => void;
