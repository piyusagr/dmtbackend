import { applyDecorators } from '@nestjs/common';
import { ApiProperty, ApiPropertyOptional, ApiPropertyOptions } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsOptional, IsString, ValidationOptions } from 'class-validator';

interface ApiString {
  stringParams?: ValidationOptions;
  apiParams?: ApiPropertyOptions;
  optional?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const ApiString = (params?: ApiString) => {
  let decorators: ClassDecorator | MethodDecorator | PropertyDecorator[] = [];

  decorators = params?.optional
    ? [...decorators, ApiPropertyOptional(params?.apiParams), IsOptional()]
    : [...decorators, ApiProperty(params?.apiParams)];

  return applyDecorators(IsString(params?.stringParams), ...decorators);
};

/**
 * Expandable data decorators
 */
export const IsIncludeQuery = () => {
  return applyDecorators(
    ApiPropertyOptional(),
    IsBoolean(),
    Transform(({ value }) => !!value),
    IsOptional()
  );
};
