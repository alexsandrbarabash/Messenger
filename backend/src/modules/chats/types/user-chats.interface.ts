import { Chats, ChatUser } from '@prisma/client';

export interface IUserChats extends ChatUser {
  chats: Chats;
}
