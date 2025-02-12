import { plainToInstance } from 'class-transformer';
import { IsNumberString, IsString, validateSync } from 'class-validator';

const DEFAULT_PORT = 3333;

enum Enviroment {
  development = 'development',
  production = 'production',
  staging = 'staging',
}

export class EnvVariables {
  @IsNumberString()
  PORT = DEFAULT_PORT;

  @IsString()
  NODE_ENV: Enviroment = Enviroment.development;

  @IsString()
  DATABASE_URL!: string;

  isDevelopment!: boolean;
  isProduction!: boolean;
}

export function validateEnv(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvVariables, config, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }
  return validatedConfig;
}

export default () => ({
  port:
    parseInt(process.env.PORT || DEFAULT_PORT.toString(), 10) || DEFAULT_PORT,
  databaseUrl: process.env.DEV_DATABASE_URL,
  isDevelopment: process.env.NODE_ENV === Enviroment.development,
  isProduction: process.env.NODE_ENV === Enviroment.production,
  nodeEnv: process.env.NODE_ENV,
});
