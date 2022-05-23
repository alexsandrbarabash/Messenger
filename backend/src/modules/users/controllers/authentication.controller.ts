import {
  Body,
  Req,
  Controller,
  HttpCode,
  Post,
  UseGuards,
  HttpStatus,
} from '@nestjs/common';

import { UsersService } from '../services';
import { CreateUserDto, RefreshTokenDto } from '../dto';
import { LocalAuthenticationGuard } from 'src/common/guards';
import {
  IRequestWithUser,
  IUserResponse,
  ITokens,
  LoginResponse,
} from '../types';
import { UserMapper } from '../mappers';

@Controller('authentication')
export class AuthenticationController {
  constructor(private readonly _usersService: UsersService) {}

  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() createUserDto: CreateUserDto,
  ): Promise<IUserResponse> {
    return this._usersService.register(createUserDto);
  }

  @Post('log-in')
  @HttpCode(HttpStatus.OK)
  @UseGuards(LocalAuthenticationGuard)
  public async logIn(@Req() request: IRequestWithUser): Promise<LoginResponse> {
    const { user } = request;
    const tokens = await this._usersService.getJwtTokens(user.id);
    return UserMapper.formatResponseForLogin({ tokens, user });
  }

  @Post('refresh-token')
  @HttpCode(HttpStatus.OK)
  public async refreshToken(
    @Body() refreshTokenDto: RefreshTokenDto,
  ): Promise<ITokens> {
    return this._usersService.refreshTokens(refreshTokenDto.refreshToken);
  }
}
