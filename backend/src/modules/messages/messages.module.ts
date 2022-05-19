import { Module } from '@nestjs/common';

import { MessagesRepository } from './repositories';
import { MessagesService } from './services';
import { PrismaModule } from '../prisma-module/prisma.module';

@Module({
  imports: [PrismaModule],
  providers: [MessagesRepository, MessagesService],
  exports: [MessagesService],
})
export class MessagesModule {}
