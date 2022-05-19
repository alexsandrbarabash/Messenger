import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Chats, Prisma } from '@prisma/client';

import { PrismaBaseService } from '../../prisma-module/services';
import { IChatData } from '../types';

@Injectable()
export class ChatsRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  public async createOne(data: Prisma.ChatsCreateInput): Promise<Chats> {
    try {
      return this._prismaBaseService.chats.create({ data });
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getByParams({
    params = {},
    take,
    skip,
    throwError,
  }: {
    params?: Prisma.UsersWhereInput;
    take?: number;
    throwError?: boolean;
    skip?: number;
  }): Promise<Chats[]> {
    try {
      const foundData = await this._prismaBaseService.chats.findMany({
        where: params,
        take,
        skip,
      });

      if (throwError && (!foundData || !foundData?.length)) {
        throw new NotFoundException('Chats not found!');
      }

      return foundData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getOneByParams({
    params,
    throwError,
  }: {
    params: Prisma.ChatsWhereInput;
    throwError?: boolean;
  }): Promise<Chats> {
    const data = await this.getByParams({ params, take: 1, throwError });
    return data[0];
  }

  /**
   *
   * TODO: move to service
   */
  public async getChatWithRelation(id: string): Promise<IChatData> {
    try {
      const data = await this._prismaBaseService.chats.findFirst({
        where: { id },
        include: {
          messages: { take: 30 },
          chatUser: {
            select: {
              users: {
                select: {
                  id: true,
                  firstName: true,
                  lastName: true,
                  username: true,
                  avatar: true,
                  isBot: true,
                },
              },
            },
          },
        },
      });
      return data;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }
}
