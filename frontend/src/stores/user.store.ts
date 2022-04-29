import { createEvent, createStore } from 'effector';

import { IUserStore, ITokens, IUser } from '../types';

export const login = createEvent<ITokens & IUser>();
export const logout = createEvent();
export const refresh = createEvent<ITokens>();

export const userStore = createStore<IUserStore>({
  id: '',
  isAuth: false,
  refreshToken: '',
  accessToken: '',
  username: '',
  firstName: ''
})
  .on(login, (state: IUserStore, response: ITokens & IUser) => ({
    ...state,
    isAuth: true,
    refreshToken: response.refreshToken,
    accessToken: response.accessToken,
    username: response.username,
    firstName: response.firstName,
    lastName: response.lastName,
    avatar: response.avatar,
    id: response.id
  }))
  .on(logout, (state) => ({
    ...state,
    id: '',
    isAuth: false,
    refreshToken: '',
    accessToken: '',
    username: '',
    firstName: ''
  }))
  .on(refresh, (state, tokens) => ({
    ...state,
    refreshToken: tokens.refreshToken,
    accessToken: tokens.accessToken
  }));
