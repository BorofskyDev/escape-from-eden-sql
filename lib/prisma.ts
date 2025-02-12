// lib/prisma.ts
import { PrismaClient } from '@prisma/client'

// Extend the globalThis type to include our prisma instance.
declare global {
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined
}

export const prisma = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV !== 'production') {
  globalThis.prisma = prisma
}
