import { PrismaClient } from "@prisma/client"

let prismaInstance: PrismaClient | null = null

export function getPrisma(): PrismaClient {
  if (!prismaInstance) {
    prismaInstance = new PrismaClient({
      log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    })
  }
  return prismaInstance
}

// Lazy singleton - only instantiates on first access
export const prisma = new Proxy({} as PrismaClient, {
  get(target, prop) {
    const client = getPrisma()
    const value = client[prop as keyof PrismaClient]
    return typeof value === 'function' ? value.bind(client) : value
  }
})

