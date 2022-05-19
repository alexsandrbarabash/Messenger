import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { configValidationSchema } from './config/config.schema';
import { LoggerModule } from './logger/logger.module';
import { HttpLoggerMiddleware } from './middlewares/http-logger.middleware';
import {
  UsersModule,
  RedisCacheModule,
  ChatsModule,
  WebsocketModule,
  MessagesModule,
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env'],
      validationSchema: configValidationSchema,
    }),
    LoggerModule,
    UsersModule,
    RedisCacheModule,
    ChatsModule,
    WebsocketModule,
    MessagesModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(HttpLoggerMiddleware)
      .forRoutes({ path: '*', method: RequestMethod.ALL });
  }
}
