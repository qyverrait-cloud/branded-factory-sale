import { NextResponse } from "next/server"
import { testDatabaseConnection } from "@/lib/api-utils"

// Health check endpoint
export async function GET() {
  try {
    const dbStatus = await testDatabaseConnection()

    return NextResponse.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      database: {
        connected: dbStatus.connected,
        ...(dbStatus.error && { error: dbStatus.error }),
      },
      environment: process.env.NODE_ENV || "development",
    })
  } catch (error: any) {
    return NextResponse.json(
      {
        status: "error",
        error: error.message || "Health check failed",
      },
      { status: 500 }
    )
  }
}

