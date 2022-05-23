import { Users } from '@prisma/client';

import { ITokens, LoginResponse, IUserResponse } from '../types';

export class UserMapper {
  static formatResponseForLogin({
    user,
    tokens,
  }: {
    user: Users;
    tokens: ITokens;
  }): LoginResponse {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
      refreshToken: tokens.refreshToken,
      accessToken: tokens.accessToken,
    };
  }

  static formatUserForResponse(user: Users): IUserResponse {
    return {
      id: user.id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      avatar: user.avatar,
    };
  }
}
