import { IChatResponse } from './chat-response.interface';
import { IUserResponse } from '../../users/types';
import { IMessages } from 'src/common/types';

export interface IChatsWithRelationResponse extends IChatResponse {
  chatUser: IUserResponse[];
  messages: IMessages[];
}
