import { Injectable } from '@nestjs/common';

import { ChatsRepository, ChatUserRepository } from '../repositories';
import { IChatData, IChatResponse, IUserChats } from '../types';

@Injectable()
export class ChatsService {
  constructor(
    private readonly _chatsRepository: ChatsRepository,
    private readonly _chatUserRepository: ChatUserRepository,
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

  public getChatData(id: string): Promise<IChatData> {
    return this._chatsRepository.getChatWithRelation(id);
  }
}
