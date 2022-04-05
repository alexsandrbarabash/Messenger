import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { AppModule } from './app.module';
import { PinoLoggerService } from './logger/pino-logger.service';
import { ASYNC_STORAGE } from './logger/logger.constants';
import { ApplicationRuntimeProcedures } from './runtime-procedures';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use((req, res, next) => {
    const asyncStorage = app.get(ASYNC_STORAGE);
    const traceId = req.headers['x-trace-id'];
    asyncStorage.run({ traceId }, () => {
      next();
    });
  });

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  const applicationRuntimeProcedures = new ApplicationRuntimeProcedures();

  await applicationRuntimeProcedures.startPrisma();

  await app.useLogger(app.get(PinoLoggerService));
  await app.listen(3000);
}

bootstrap();
