import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Users } from '@prisma/client';
import { Injectable } from '@nestjs/common';

import { UsersService } from '../services';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly _usersService: UsersService) {
    super();
  }

  public async validate(username: string, password: string): Promise<Users> {
    return this._usersService.getAuthenticatedUser(username, password);
  }
}
