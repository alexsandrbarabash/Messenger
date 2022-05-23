import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Users, Prisma } from '@prisma/client';

import { PrismaBaseService } from '../../prisma-module/services';
import { PostgresErrorCode } from '../../../common/enum';

@Injectable()
export class UsersRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  public async create(users: Prisma.UsersCreateInput): Promise<Users> {
    try {
      return this._prismaBaseService.users.create({ data: users });
    } catch (error) {
      if (error.code === PostgresErrorCode.UniqueViolation) {
        throw new BadRequestException('User with this username exists');
      }
      throw new InternalServerErrorException(error.message);
    }
  }

  private async _getByParams({
    params,
    take,
    throwError,
  }: {
    params: Prisma.UsersWhereInput;
    take?: number;
    throwError?: boolean;
  }): Promise<Users[]> {
    try {
      const foundData = await this._prismaBaseService.users.findMany({
        where: params,
        take,
      });

      if (throwError && (!foundData || !foundData?.length)) {
        throw new NotFoundException('Users not found!');
      }

      return foundData;
    } catch (error) {
      throw new InternalServerErrorException(error.message);
    }
  }

  public async getOneByParams({
    params,
    throwError,
  }: {
    params: Prisma.UsersWhereInput;
    throwError?: boolean;
  }): Promise<Users> {
    const data = await this._getByParams({ params, take: 1, throwError });
    return data[0];
  }
}
