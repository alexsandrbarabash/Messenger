import { PrismaClient } from '@prisma/client';

import * as data from './data.json';

export async function fillRoles(): Promise<void> {
  const prisma = new PrismaClient();

  await prisma.roles.createMany({ data, skipDuplicates: true });
}
