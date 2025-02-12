import { ApiPropertyOptions } from '@nestjs/swagger';
import { ValidationOptions } from 'class-validator';
interface ApiString {
    stringParams?: ValidationOptions;
    apiParams?: ApiPropertyOptions;
    optional?: boolean;
}
export declare const ApiString: (params?: ApiString) => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export declare const IsIncludeQuery: () => <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
export {};
