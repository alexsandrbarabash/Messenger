import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

import { UsersService } from '../services';
import { ITokenPayloadAccess } from '../types';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly _configService: ConfigService,
    private readonly _userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.headers?.Authentication as string;
        },
      ]),
      secretOrKey: _configService.get('JWT_SECRET'),
    });
  }

  public async validate(payload: ITokenPayloadAccess) {
    return this._userService.getById(payload.userId);
  }
}
