import { Logger, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';
import { userSession } from '../common/middlewears/session.middlewear';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import { Integrations } from '@sentry/tracing';
import prisma from '../config/db';
import * as morgan from 'morgan';
import { NestExpressApplication } from '@nestjs/platform-express';
import { getLoggerOptions } from '../config/logger.config';
import { RelatedAction } from '../helpers/related-action.helper';

async function bootstrap() {
  // const corsOrigin = process.env.CORS_ORIGIN_URL || '*';

  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: getLoggerOptions(),
    cors: {
      credentials: true,
      origin: (reqOrgin, callback) => {
        callback(null, reqOrgin);
      },
      // origin: corsOrigin,
    },
  });

  app.enableCors();

  // TODO: Setup compression
  app.use(userSession);
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: ['1'],
  });

  app.setBaseViewsDir('templates');
  app.setViewEngine('ejs');
  app.use(morgan('dev'));

  const config = new DocumentBuilder()
    .setTitle('DMT Adventure API')
    .setDescription('DMT Adventure API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config, {
    extraModels: [RelatedAction],
  });
  SwaggerModule.setup('v1/docs', app, document);

  Sentry.init({
    dsn: 'https://958b14e9cd0142faa048bdea42d52be1@o1330309.ingest.sentry.io/6593019',
    integrations: [new Integrations.Prisma({ client: prisma })],
  });

  const port = process.env.PORT || 4000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap();
