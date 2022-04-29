import axios, { AxiosInstance } from 'axios';

import { RoutesEnum } from '../enums';
import { IChatCard, IChatData } from '../types';

export class ChatsApiHandler {
  private readonly _apiInstance: AxiosInstance;

  constructor(accessToken?: string) {
    this._apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: { authorization: accessToken! }
    });
  }

  public async getMyChatList(): Promise<IChatCard[]> {
    const { data } = await this._apiInstance.get<IChatCard[]>(
      RoutesEnum.MY_CHAT_LIST
    );
    return data;
  }

  public async getChatData(chatId: string): Promise<IChatData> {
    const { data } = await this._apiInstance.get<IChatData>(
      `${RoutesEnum.CHAT_DATA}${chatId}`
    );
    return data;
  }
}
