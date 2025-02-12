"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const session_middlewear_1 = require("../common/middlewears/session.middlewear");
const swagger_1 = require("@nestjs/swagger");
const Sentry = require("@sentry/node");
const tracing_1 = require("@sentry/tracing");
const db_1 = require("../config/db");
const morgan = require("morgan");
const logger_config_1 = require("../config/logger.config");
const related_action_helper_1 = require("../helpers/related-action.helper");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        logger: (0, logger_config_1.getLoggerOptions)(),
        cors: {
            credentials: true,
            origin: (reqOrgin, callback) => {
                callback(null, reqOrgin);
            },
        },
    });
    app.enableCors();
    app.use(session_middlewear_1.userSession);
    app.enableVersioning({
        type: common_1.VersioningType.URI,
        defaultVersion: ['1'],
    });
    app.setBaseViewsDir('templates');
    app.setViewEngine('ejs');
    app.use(morgan('dev'));
    const config = new swagger_1.DocumentBuilder()
        .setTitle('DMT Adventure API')
        .setDescription('DMT Adventure API')
        .setVersion('1.0')
        .addBearerAuth()
        .build();
    const document = swagger_1.SwaggerModule.createDocument(app, config, {
        extraModels: [related_action_helper_1.RelatedAction],
    });
    swagger_1.SwaggerModule.setup('v1/docs', app, document);
    Sentry.init({
        dsn: 'https://958b14e9cd0142faa048bdea42d52be1@o1330309.ingest.sentry.io/6593019',
        integrations: [new tracing_1.Integrations.Prisma({ client: db_1.default })],
    });
    const port = process.env.PORT || 4000;
    await app.listen(port);
    common_1.Logger.log(`🚀 Application is running on: http://localhost:${port}`);
}
bootstrap();
//# sourceMappingURL=main.js.map