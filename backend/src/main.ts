import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { v4 as uuid } from 'uuid';

import { AppModule } from './app.module';
import { PinoLoggerService } from './logger/pino-logger.service';
import { ASYNC_STORAGE } from './logger/logger.constants';
import { ApplicationRuntimeProcedures } from './runtime-procedures';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });

  app.use((req, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-trace-id'] || uuid();
    asyncStorage.run({ traceId }, () => {
      next();
    });
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  const applicationRuntimeProcedures = new ApplicationRuntimeProcedures();

  await applicationRuntimeProcedures.startPrisma();

  await applicationRuntimeProcedures.startSeed();

  await app.useLogger(app.get(PinoLoggerService));
  const configService: ConfigService = app.get(ConfigService);
  await app.listen(configService.get('PORT'));
}

bootstrap();
