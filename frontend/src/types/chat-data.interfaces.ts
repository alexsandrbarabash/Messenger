import { IChatCard } from './chat-card.interfaces';
import { IMessages } from './messages.interface';
import { IUser } from './user.interface';

export interface IChatData extends IChatCard {
  messages: IMessages[];
  chatUser: IUser[];
}
