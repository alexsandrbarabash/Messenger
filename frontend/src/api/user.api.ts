import axios, { AxiosInstance } from 'axios';

import { RoutesEnum } from '../enums';
import { IUser } from '../types';

export class UserApiHandler {
  private readonly _apiInstance: AxiosInstance;

  constructor(accessToken?: string) {
    this._apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: { authorization: accessToken! }
    });
  }

  public async getMe(): Promise<IUser> {
    const { data } = await this._apiInstance.get<IUser>(RoutesEnum.GET_ME);
    return data;
  }
}
