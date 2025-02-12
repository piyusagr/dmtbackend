import {registerDecorator, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface} from 'class-validator';

@ValidatorConstraint({name: 'timeFormat', async: false})
export class TimeFormatValidator implements ValidatorConstraintInterface {
    validate(time: string) {
        // Define a regex pattern for HH:mm format (24-hour clock)
        const regexPattern = /^(?:[01]\d|2[0-3]):[0-5]\d$/;

        return regexPattern.test(time);
    }

    defaultMessage() {
        return 'Invalid time format (HH:mm)';
    }
}

export function IsTimeFormat(validationOptions?: ValidationOptions) {
    return function (object: Object, propertyName: string) {
        registerDecorator({
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            constraints: [],
            validator: TimeFormatValidator,
        });
    };
}
