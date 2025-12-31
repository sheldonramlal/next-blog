// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';

// 1️⃣ Create Prisma client instance
const prisma = new PrismaClient();

// 2️⃣ Pass Prisma client to Better Auth adapter
const adapter = new PrismaPg(prisma);

export { adapter, prisma };
