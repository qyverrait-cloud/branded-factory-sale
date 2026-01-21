import { NextResponse } from "next/server"

// Standard API response helper
export function apiResponse<T>(
  data: T,
  status: number = 200,
  message?: string
) {
  return NextResponse.json(
    {
      success: status >= 200 && status < 300,
      data,
      ...(message && { message }),
    },
    { status }
  )
}

// Error response helper
export function apiError(
  message: string,
  status: number = 500,
  details?: any
) {
  return NextResponse.json(
    {
      success: false,
      error: message,
      ...(details && { details }),
    },
    { status }
  )
}

// Validation helper
export function validateRequired(
  data: Record<string, any>,
  fields: string[]
): string | null {
  for (const field of fields) {
    if (!data[field] || (typeof data[field] === "string" && !data[field].trim())) {
      return `${field} is required`
    }
  }
  return null
}

// Pagination helper
export function getPaginationParams(searchParams: URLSearchParams) {
  const page = parseInt(searchParams.get("page") || "1", 10)
  const limit = parseInt(searchParams.get("limit") || "10", 10)
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

// Database connection test
export async function testDatabaseConnection() {
  try {
    const { prisma } = await import("@/lib/prisma")
    await prisma.$queryRaw`SELECT 1`
    return { connected: true, error: null }
  } catch (error: any) {
    return {
      connected: false,
      error: error.message || "Database connection failed",
    }
  }
}

