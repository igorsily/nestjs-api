import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as Sentry from '@sentry/node';
import morgan from 'morgan';
import { ExceptionFilter } from './filters/exception';
import { ApplicationModule } from './modules';
import { IS_DEV, NODE_ENV, SENTRY_DSN, SENTRY_RATE, VERSION } from './settings';

Sentry.init({
  dsn: SENTRY_DSN,
  environment: NODE_ENV,
  release: VERSION,
  tracesSampleRate: SENTRY_RATE
});

async function bootstrap() {
  const app = await NestFactory.create(ApplicationModule);
  const { httpAdapter } = app.get(HttpAdapterHost);

  if (IS_DEV) {
    app.use(morgan('dev'));
  }
  app.enableCors();
  app.useGlobalFilters(new ExceptionFilter(httpAdapter));

  const swaggerOptions = new DocumentBuilder()
    .setTitle('Documentação de API')
    .setDescription('Documentação de API')
    .setVersion(`1.${VERSION}`)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('/swagger', app, document);

  await app.listen(3000, '0.0.0.0', () => {
    console.log('******************************');
    console.log(`SERVER STARTED as ${NODE_ENV} PORT 3000`);
    console.log('******************************');
  });

  process.on('unhandledRejection', (reason, promise) => {
    console.error(reason);
    console.log(promise);
  });

  process.on('uncaughtException', err => {
    console.error(err);
  });

  process.on('SIGTERM', async () => {
    await app.close();
    process.exit(0);
  });
}

bootstrap().catch(err => console.error(err));
