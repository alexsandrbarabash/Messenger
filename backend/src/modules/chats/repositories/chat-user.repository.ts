import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ChatUser, Prisma } from '@prisma/client';

import { PrismaBaseService } from '../../prisma-module/services';
import { IUserChats } from '../types';
import { PostgresErrorCode } from '../../../common/enum';

@Injectable()
export class ChatUserRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  public async createMany(data: ChatUser[]): Promise<ChatUser[]> {
    try {
      await this._prismaBaseService.chatUser.createMany({ data });
      return data;
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User is already exists in this chat');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  public async createOne(user: ChatUser): Promise<ChatUser> {
    const data = await this.createMany([user]);
    return data[0];
  }

  public async getByParams({
    params = {},
    take,
    skip,
    relation,
    throwError,
  }: {
    params?: Prisma.ChatUserWhereInput;
    take?: number;
    throwError?: boolean;
    relation?: { chats?: boolean; users?: boolean };
    skip?: number;
  }): Promise<ChatUser[]> {
    try {
      const foundData = await this._prismaBaseService.chatUser.findMany({
        where: params,
        include: relation,
        take,
        skip,
      });

      if (throwError && (!foundData || !foundData?.length)) {
        throw new NotFoundException('User in chat not found!');
      }

      return foundData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  /**
   * TODO: move to server
   */
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
