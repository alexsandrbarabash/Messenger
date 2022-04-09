import { Module } from '@nestjs/common';

import { PrismaBaseService } from './services';

@Module({
  providers: [PrismaBaseService],
  exports: [PrismaBaseService],
})
export class PrismaModule {}
