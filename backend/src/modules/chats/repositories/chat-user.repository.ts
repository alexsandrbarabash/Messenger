import { Injectable, InternalServerErrorException } from '@nestjs/common';

import { PrismaBaseService } from '../../prisma-module/services';
import { IUserChats } from '../types';

@Injectable()
export class ChatUserRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  public async getAllUserChatByUserId(userId: string): Promise<IUserChats[]> {
    try {
      const foundData = await this._prismaBaseService.chatUser.findMany({
        where: { userId },
        include: { chats: true },
      });
      return foundData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
