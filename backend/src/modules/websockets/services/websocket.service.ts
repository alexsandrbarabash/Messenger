import { Injectable } from '@nestjs/common';
import { Chats, Messages } from '@prisma/client';

import { CreateChatDto, JoinUserDto } from '../dto';
import { ChatsService } from '../../chats/services';
import { UsersService } from '../../users/services';
import { MessagesService } from '../../messages/services';
import { IJoinUserEmitData } from '../types';

@Injectable()
export class WebsocketService {
  constructor(
    private readonly _chatsService: ChatsService,
    private readonly _usersService: UsersService,
    private readonly _messagesService: MessagesService,
  ) {}

  public async joinUser(joinUserDto: JoinUserDto): Promise<IJoinUserEmitData> {
    await this._chatsService.addUsersToChat({
      chatId: joinUserDto.chatId,
      users: [{ userId: joinUserDto.userId }],
    });

    const user = await this._usersService.getById(joinUserDto.userId);
    return { ...user, chatId: joinUserDto.chatId };
  }

  public async createChat(createChatDto: CreateChatDto): Promise<Chats> {
    const data = await this._chatsService.createChat({
      users: createChatDto.users,
      ownerId: createChatDto.ownerId,
      title: createChatDto.title,
    });

    return data;
  }

  public async writeMessage({
    chatId,
    userId,
    text,
  }: {
    chatId;
    userId;
    text;
  }): Promise<Messages> {
    const message = await this._messagesService.writeMessage({
      chatId,
      userId,
      text,
    });

    return message;
  }
}
