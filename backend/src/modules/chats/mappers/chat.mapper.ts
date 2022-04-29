import {
  IChatsWithRelationResponse,
  IChatData,
  IChatResponse,
  IUserChats,
} from '../types';

export class ChatsMappers {
  static formatChatDataToResponse(
    chatData: IChatData,
  ): IChatsWithRelationResponse {
    return {
      id: chatData.id,
      title: chatData.title,
      avatar: chatData.avatar,
      createdAt: chatData.createdAt,
      messages: chatData.messages,
      chatUser: chatData.chatUser.map((item) => ({ ...item.users })),
    };
  }

  static formatUserChatsToReponse(userChats: IUserChats[]): IChatResponse[] {
    return userChats.map((item) => ({ ...item.chats }));
  }
}
