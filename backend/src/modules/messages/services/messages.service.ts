import { Injectable } from '@nestjs/common';
import { Messages } from '@prisma/client';

import { MessagesRepository } from '../repositories';

@Injectable()
export class MessagesService {
  constructor(private readonly _messagesRepository: MessagesRepository) {}

  public async writeMessage({
    chatId,
    userId,
    text,
  }: {
    chatId;
    userId;
    text;
  }): Promise<Messages> {
    const message = await this._messagesRepository.create({
      chatId,
      userId,
      text,
    });
    return message;
  }
}
