/* eslint-disable @typescript-eslint/no-unused-vars */
import { HttpException, HttpStatus } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { string } from 'yup';

export class DatabseError extends HttpException {
  constructor(error: unknown) {
    const DEFAULT_MESSAGE = 'Unknown database error occured.';
    let errorMessage;

    if (error instanceof PrismaClientKnownRequestError) {
      errorMessage = getPrismaErrorMessage(error) || DEFAULT_MESSAGE;
    }

    super({ message: errorMessage, meta: error }, HttpStatus.BAD_GATEWAY);
  }
}

const getPrismaErrorMessage = (error: PrismaClientKnownRequestError) => {
  const prismaError = Object.entries(PRISMA_KNOWN_ERRORS).find(
    ([key, { code, message }]) => {
      return error.code === code;
    },
  );

  if (!prismaError) return;

  const [key, { code, message }] = prismaError;

  if (message instanceof Function) {
    return message(error);
  }

  return prismaError?.[1].message;
};

type PrsimaErrorType = Record<(typeof PRISMA_ERORR_TYPE)[number], PrismaError>;

interface PrismaError {
  code: string;
  message: (error: PrismaClientKnownRequestError) => string | string;
}

const PRISMA_ERORR_TYPE = ['forgienKeyFailure'] as const;
const PRISMA_KNOWN_ERRORS: PrsimaErrorType = {
  forgienKeyFailure: {
    code: 'P2003',
    message: (error) => `Forgien key failure`,
  },
};
