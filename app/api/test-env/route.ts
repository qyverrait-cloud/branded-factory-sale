import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    DATABASE_URL: process.env.DATABASE_URL || "NOT FOUND",
    NODE_ENV: process.env.NODE_ENV || "NOT FOUND",
    hasEnvVar: !!process.env.DATABASE_URL,
  })
}
