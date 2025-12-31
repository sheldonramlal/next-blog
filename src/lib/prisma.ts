// src/lib/prisma.ts
import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// 1️⃣ Create Prisma client instance
const prisma = new PrismaClient();

// 2️⃣ Create a PostgreSQL pool and pass it to Better Auth adapter
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const adapter = new PrismaPg(pool);

export { adapter, prisma };
