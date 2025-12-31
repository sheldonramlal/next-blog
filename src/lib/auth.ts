import { betterAuth } from 'better-auth'
import { prismaAdapter } from 'better-auth/adapters/prisma'
import { headers } from 'next/headers'
import prisma from '../lib/prisma'

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
    emailAndPassword: {
    enabled: true,
  },
})

export async function getSession() {
  return await auth.api.getSession({
    headers: await headers() // some endpoints might require headers
  });
}
// await auth.api.getSession({
//     headers: await headers() // some endpoints might require headers
// })