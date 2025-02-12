import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty,
  ApiPropertyOptional,
  getSchemaPath,
} from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsOptional } from 'class-validator';
import { z } from 'zod';
import { ApiError } from '../common/errors/api.error';

export class RelatedAction {
  @ApiPropertyOptional({ type: [Number] })
  connect?: number[];

  @ApiPropertyOptional({ type: [Number] })
  disconnect?: number[];
}

const relatedActionSchema = z
  .object({
    connect: z.array(z.number()).optional(),
    disconnect: z.array(z.number()).optional(),
  })
  .strict()
  .refine((data) => !!Object.values(data).length)
  .or(z.array(z.number()));

type RelatedType = z.infer<typeof relatedActionSchema>;

/**
 *
 * @param value Value to validate
 * @returns {boolean} boolean if the value is valid;
 */
const isValidRelatedAction = (value: RelatedType) => {
  const data = relatedActionSchema.safeParse(value);

  return data.success;
};

/**
 *
 * @param values
 * @returns transformed and formated assign values
 */
const getRelatedActionReturn = (values: RelatedType) => {
  if (!Array.isArray(values)) {
    type ActionObjectType = Partial<
      Record<keyof RelatedAction, { id: number }[]>
    >;

    const actionsObject: ActionObjectType = {};

    // Transform Connect IDS
    if (values?.connect)
      actionsObject.connect = values.connect.map((id) => ({ id }));

    // Transform Disconnect IDS
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

export const TransformAssign = () => {
  type AssignTransformFn = Omit<TransformFnParams, 'value'> & {
    value: number[];
  };

  return applyDecorators(
    IsOptional(),
    ApiProperty({
      oneOf: [
        { $ref: getSchemaPath(RelatedAction) },
        { type: 'array', items: { type: 'number' } },
      ],
    }),
    Transform(
      ({ value, key }: AssignTransformFn) => {
        const isValid = isValidRelatedAction(value);
        if (!isValid)
          throw new ApiError(
            `Invalid value for ${key}. Must be an array of numbers, or {connect?: number[], disconnect?: number[]}`,
          );

        return getRelatedActionReturn(value);
      },
      { toPlainOnly: true },
    ),
  );
};
