import { createEvent, createStore } from 'effector';

import { IUserStore, ITokens } from '../types';

export const login = createEvent<ITokens>();
export const logout = createEvent();

export const userStore = createStore<IUserStore>({
  isAuth: true,
  refreshToken: '',
  accessToken: ''
})
  .on(login, (state: IUserStore, tokens: ITokens) => ({
    ...state,
    isAuth: true,
    refreshToken: tokens.refreshToken,
    accessToken: tokens.accessToken
  }))
  .on(logout, (state) => ({
    ...state,
    isAuth: false,
    refreshToken: '',
    accessToken: ''
  }));
