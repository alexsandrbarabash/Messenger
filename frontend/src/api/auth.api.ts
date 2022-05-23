import axios, { AxiosInstance } from 'axios';

import { RoutesEnum, MethodsEnum } from '../enums';
import { ITokens, IRegisterBody, ILogInBody, IUser } from '../types';

export class AuthApiHandler {
  private readonly _apiInstance: AxiosInstance;

  constructor() {
    this._apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL
    });
  }

  public register({
    firstName,
    lastName,
    username,
    password
  }: IRegisterBody): Promise<any> {
    return this._apiInstance.request<IRegisterBody, any>({
      url: RoutesEnum.REGISTER,
      method: MethodsEnum.POST,
      data: {
        firstName,
        lastName,
        username,
        password
      }
    });
  }

  public async logIn({
    username,
    password
  }: ILogInBody): Promise<ITokens & IUser> {
    const { data } = await this._apiInstance.post<ITokens & IUser>(
      RoutesEnum.LOG_IN,
      {
        username,
        password
      }
    );
    return data;
  }

  public async refresh(refreshToken: string): Promise<ITokens> {
    const { data } = await this._apiInstance.post<ITokens>(RoutesEnum.REFRESH_TOKEN, {
      refreshToken
    });

    return data;
  }
}
