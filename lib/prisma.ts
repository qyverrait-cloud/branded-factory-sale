import { PrismaClient } from "@prisma/client"

// Create a new PrismaClient instance only when needed at RUNTIME
// This prevents DATABASE_URL validation during module load/build time
declare global {
  var cachedPrisma: PrismaClient | undefined
}

export const prisma = global.cachedPrisma || new PrismaClient({
  log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
})

if (process.env.NODE_ENV !== "production") {
  global.cachedPrisma = prisma
}

