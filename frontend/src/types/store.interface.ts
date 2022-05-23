import { IMessages } from './messages.interface';
import { IChatCard } from './chat-card.interfaces';

export interface IUserStore {
  isAuth: boolean;
  refreshToken: string;
  accessToken: string;
  id: string;
  firstName: string;
  lastName?: string;
  username: string;
  avatar?: string;
}

export interface IAlertStore {
  message: string;
  show: boolean;
}

export interface IChatStore {
  chatId: string;
  title: string;
}

export interface IMessagesStore {
  messages: IMessages[];
}

export interface IChatsStore {
  chats: IChatCard[]
}