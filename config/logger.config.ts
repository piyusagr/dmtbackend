import { NestApplicationOptions } from '@nestjs/common';
import configuration from './configuration';

export const getLoggerOptions = (): NestApplicationOptions['logger'] => {
  const isDev = configuration().isDevelopment;

  if (isDev) return ['debug', 'error', 'log', 'warn', 'verbose'];

  return ['error', 'warn'];
};
