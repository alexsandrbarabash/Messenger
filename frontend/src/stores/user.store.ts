import { createEvent, createStore } from 'effector';

import { IUserStore, ITokens, IUser } from '../types';

export const login = createEvent<ITokens & IUser>();
export const logout = createEvent();

export const userStore = createStore<IUserStore>({
  id: '',
  isAuth: true,
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
    isAuth: false,
    refreshToken: '',
    accessToken: ''
  }));
