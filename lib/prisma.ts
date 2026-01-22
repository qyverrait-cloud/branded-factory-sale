import { PrismaClient } from "@prisma/client"

let prismaInstance: PrismaClient | null = null

// Check if DATABASE_URL is set
if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL environment variable is not set!")
  console.error("Please set DATABASE_URL in your environment variables or .env.local file")
  console.error("Format: mysql://username:password@host:port/database_name")
}

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
      errorFormat: "pretty",
    })
  }
  return prismaInstance
}

