import { Injectable, BadRequestException } from '@nestjs/common';
import { Users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import * as bcrypt from 'bcrypt';

import { UsersRepository } from '../repositories';
import {
  IUserResponse,
  ITokenPayloadAccess,
  ITokens,
  ITokenPayloadRefresh,
} from '../types';
import { CreateUserDto } from '../dto';
import { RedisService } from '../../redis/services/redis.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly _usersRepository: UsersRepository,
    private readonly _jwtService: JwtService,
    private readonly _configService: ConfigService,
    private readonly _redisService: RedisService,
  ) {}

  public async getById(userId: string): Promise<Users> {
    return this._usersRepository.getOneByParams({
      params: { id: userId },
      throwError: true,
    });
  }

  private async _getByUsername(username: string): Promise<Users> {
    return this._usersRepository.getOneByParams({
      params: { username },
      throwError: true,
    });
  }

  public async register(createUserDto: CreateUserDto): Promise<IUserResponse> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const createdUser = await this._usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return createdUser;
  }

  public async getAuthenticatedUser(
    username: string,
    hashedPassword: string,
  ): Promise<Users> {
    try {
      const user = await this._getByUsername(username);
      const isPasswordMatching = await bcrypt.compare(
        hashedPassword,
        user.password,
      );
      if (!isPasswordMatching) {
        throw new BadRequestException('Wrong credentials provided');
      }
      user.password = undefined;
      return user;
    } catch (error) {
      throw new BadRequestException('Wrong credentials provided');
    }
  }

  public async getJwtTokens(userId: string): Promise<ITokens> {
    const accessPayload: ITokenPayloadAccess = { userId };
    const accessToken = this._jwtService.sign(accessPayload, {
      expiresIn: this._configService.get('JWT_EXPIRES_IN_ACCESS'),
    });

    const tokenId = await this._redisService.setToken(userId);

    const refreshPayload: ITokenPayloadRefresh = { userId, tokenId };
    const refreshToken = this._jwtService.sign(refreshPayload, {
      expiresIn: this._configService.get('JWT_EXPIRES_IN_REFRESH'),
    });
    return { accessToken, refreshToken };
  }

  public async refreshTokens(refreshToken: string): Promise<ITokens> {
    const payload = this._jwtService.verify<ITokenPayloadRefresh>(refreshToken);
    const tokenId = await this._redisService.getToken({
      userId: payload.userId,
      throwError: true,
    });
    if (payload.tokenId !== tokenId) {
      throw new BadRequestException('Token not found');
    }
    await this._redisService.removeToken(payload.userId);
    return this.getJwtTokens(payload.userId);
  }

  public async getUserFromSocket(accessToken: string): Promise<Users> {
    try {
      const payload = this._jwtService.verify<ITokenPayloadAccess>(accessToken);
      return this.getById(payload.userId);
    } catch (error) {
      throw new WsException('Forbidden');
    }
  }
}
