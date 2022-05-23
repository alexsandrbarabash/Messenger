import { Injectable } from '@nestjs/common';
import { Chats, ChatUser } from '@prisma/client';

import {
  ChatsRepository,
  ChatUserRepository,
  RolesRepository,
} from '../repositories';
import { IChatData, IChatResponse, IUserChats } from '../types';
import { Roles } from '../enums';

@Injectable()
export class ChatsService {
  constructor(
    private readonly _chatsRepository: ChatsRepository,
    private readonly _chatUserRepository: ChatUserRepository,
    private readonly _rolesRepository: RolesRepository,
  ) {}

  public async getChats({
    take,
    skip,
  }: {
    take?: number;
    skip?: number;
  }): Promise<IChatResponse[]> {
    return this._chatsRepository.getByParams({ take, skip });
  }

  public async getChatsByUser(userId: string): Promise<IUserChats[]> {
    return this._chatUserRepository.getAllUserChatByUserId(userId);
  }

  public async getChat(id: string): Promise<IChatResponse> {
    return this._chatsRepository.getOneByParams({
      params: { id },
      throwError: true,
    });
  }

  public async getChatData(id: string): Promise<IChatData> {
    return this._chatsRepository.getChatWithRelation(id);
  }

  public async getMyChat(userId: string): Promise<ChatUser[]> {
    return this._chatUserRepository.getByParams({ params: { userId } });
  }

  public async addUsersToChat({
    users,
    chatId,
  }: {
    users?: { userId: string; roleId?: string }[];
    chatId: string;
  }): Promise<void> {
    if (!users?.length) {
      return;
    }
    const role = await this._rolesRepository.getOneByParams({
      params: { roles: Roles.DEFAULT },
      throwError: true,
    });

    const chatUsers = users.map((item) => ({
      userId: item.userId,
      chatId,
      roleId: item.roleId || role.id,
    }));

    await this._chatUserRepository.createMany(chatUsers);
  }

  public async createChat({
    users,
    ownerId,
    title,
  }: {
    ownerId: string;
    users?: { userId: string; roleId?: string }[];
    title: string;
  }): Promise<Chats> {
    const chat = await this._chatsRepository.createOne({ title });

    const role = await this._rolesRepository.getOneByParams({
      params: { roles: Roles.OWNER },
      throwError: true,
    });

    /**
     * Add owner
     */
    await this.addUsersToChat({
      users: [{ userId: ownerId, roleId: role.id }],
      chatId: chat.id,
    });

    /**
     * Add other user
     */
    await this.addUsersToChat({
      users,
      chatId: chat.id,
    });

    return chat;
  }
}
