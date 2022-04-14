import axios, { AxiosInstance } from 'axios';

import { RoutesEnum, MethodsEnum } from '../enums';
import { ITokens, IRegisterBody, ILogInBody } from '../types';

export class ApiHandler {
  private readonly _apiInstance: AxiosInstance;

  constructor(accessToken?: string) {
    this._apiInstance = axios.create({
      baseURL: process.env.REACT_APP_BACKEND_URL,
      headers: { authorization: accessToken! }
    });
  }

  public register({
    firstName,
    lastName,
    username,
    password
  }: IRegisterBody): Promise<any> {
    // TODO add correct response
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

  public async logIn({ username, password }: ILogInBody): Promise<ITokens> {
    const response = await this._apiInstance.request<ILogInBody, ITokens>({
      url: RoutesEnum.LOG_IN,
      method: MethodsEnum.POST,
      data: { username, password }
    });
    console.log(response);
    return response;
  }

  public async refresh(refreshToken: string): Promise<ITokens>{
    return this._apiInstance.request<ILogInBody, ITokens>({
      url: RoutesEnum.LOG_IN,
      method: MethodsEnum.POST,
      data: { refreshToken }
    });
  };
}
