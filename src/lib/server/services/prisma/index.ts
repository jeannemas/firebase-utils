import { PrismaClient } from '@prisma/client';

/** The Prisma client. */
export const prisma = new PrismaClient();

// We connect to the database on module init.
await prisma.$connect();
