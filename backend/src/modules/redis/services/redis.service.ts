import {
  Injectable,
  Inject,
  CACHE_MANAGER,
  BadRequestException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cache } from 'cache-manager';
import { v4 as uuid } from 'uuid';

import { RedisException } from 'src/common/exception';

@Injectable()
export class RedisService {
  constructor(
    @Inject(CACHE_MANAGER) private readonly _cache: Cache,
    private readonly _configService: ConfigService,
  ) {}

  public async getToken({
    userId,
    throwError = false,
  }: {
    userId: string;
    throwError: boolean;
  }): Promise<string> {
    try {
      const tokenId = await this._cache.get<string>(userId);
      if (throwError && !tokenId) {
        throw new BadRequestException('Token not found');
      }
      return tokenId;
    } catch (error) {
      throw new RedisException(error.message, error);
    }
  }

  public async setToken(userId: string): Promise<string> {
    try {
      const tokenId = uuid();
      await this._cache.set<string>(userId, tokenId, {
        ttl: this._configService.get('JWT_EXPIRES_IN_REFRESH'),
      });
      return tokenId;
    } catch (error) {
      throw new RedisException(error.message, error);
    }
  }

  public removeToken(userId: string): Promise<void> {
    try {
      return this._cache.del(userId);
    } catch (error) {
      throw new RedisException(error.message, error);
    }
  }
}
