import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Prisma, Messages } from '@prisma/client';

import { PrismaBaseService } from '../../prisma-module/services';

@Injectable()
export class MessagesRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  public async create(
    message: Prisma.MessagesUncheckedCreateInput,
  ): Promise<Messages> {
    try {
      return this._prismaBaseService.messages.create({ data: message });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
