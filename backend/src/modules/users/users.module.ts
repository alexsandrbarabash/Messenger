import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { PrismaModule } from '../prisma-module/prisma.module';
import { UsersService } from './services';
import { UsersController, AuthenticationController } from './controllers';
import { UsersRepository } from './repositories';
import { LocalStrategy, JwtStrategy } from './strateges';
import { RedisCacheModule } from '../redis/redis-cache.module';

@Module({
  imports: [
    PrismaModule,
    PassportModule,
    ConfigModule,
    RedisCacheModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get('JWT_SECRET'),
      }),
    }),
  ],
  controllers: [UsersController, AuthenticationController],
  providers: [UsersService, UsersRepository, LocalStrategy, JwtStrategy],
  exports: [UsersService],
})
export class UsersModule {}
