import { PrismaClient } from "@prisma/client"

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set!")
  console.error("Please set DATABASE_URL in your environment variables or .env.local file")
  console.error("Format: mysql://username:password@host:port/database_name")
}

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

