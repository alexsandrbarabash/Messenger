import { Module } from '@nestjs/common';

import { PrismaModule } from '../prisma-module/prisma.module';
import { ChatsRepository, ChatUserRepository } from './repositories';
import { ChatsService } from './services';
import { ChatsController } from './controllers';

@Module({
  imports: [PrismaModule],
  controllers: [ChatsController],
  providers: [ChatsRepository, ChatsService, ChatUserRepository],
})
export class ChatsModule {}
