import { PrismaClient } from '@prisma/client'

//Singleton Pattern
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

//Global instance for Prisma
export const prisma = globalForPrisma.prisma ?? new PrismaClient()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma