import { Controller, Get, UseGuards, Req } from '@nestjs/common';

import { UsersService } from '../services';
import { JwtAuthenticationGuard } from 'src/common/guards';
import { IRequestWithUser, IUserResponse } from '../types';
import { UserMapper } from '../mappers';

@UseGuards(JwtAuthenticationGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @Get()
  public getUserDataFromToken(@Req() req: IRequestWithUser): IUserResponse {
    return UserMapper.formatUserForResponse(req.user);
  }
}
