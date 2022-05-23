import { Chats, Messages } from '@prisma/client';

export interface IChatUserSelectData {
  users: {
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    avatar: string;
    isBot: boolean;
  };
}

export interface IChatData extends Chats {
  messages: Messages[];
  chatUser: IChatUserSelectData[];
}
