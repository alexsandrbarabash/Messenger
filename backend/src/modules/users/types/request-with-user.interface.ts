import { Request } from 'express';
import { Users } from '@prisma/client';

export interface IRequestWithUser extends Request {
  user: Users;
}
