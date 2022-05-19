import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, Roles } from '@prisma/client';

import { PrismaBaseService } from '../../prisma-module/services';

@Injectable()
export class RolesRepository {
  constructor(private readonly _prismaBaseService: PrismaBaseService) {}

  private async _getByParams({
    params,
    take,
    throwError,
  }: {
    params: Prisma.RolesWhereInput;
    take?: number;
    throwError?: boolean;
  }): Promise<Roles[]> {
    try {
      const foundData = await this._prismaBaseService.roles.findMany({
        where: params,
        take,
      });

      if (throwError && (!foundData || !foundData?.length)) {
        throw new NotFoundException('Roles not found!');
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
    params: Prisma.RolesWhereInput;
    throwError?: boolean;
  }): Promise<Roles> {
    const data = await this._getByParams({ params, take: 1, throwError });
    return data[0];
  }
}
