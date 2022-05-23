import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma-module/prisma.module';
import {
  ChatsRepository,
  ChatUserRepository,
  RolesRepository,
} from './repositories';
import { ChatsService } from './services';
import { ChatsController } from './controllers';

@Module({
  imports: [PrismaModule],
  controllers: [ChatsController],
  providers: [
    ChatsRepository,
    ChatsService,
    ChatUserRepository,
    RolesRepository,
  ],
  exports: [ChatsService],
})
export class ChatsModule {}
