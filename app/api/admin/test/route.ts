import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export const dynamic = 'force-dynamic'

export async function GET() {
  try {
    const count = await prisma.product.count()
    return NextResponse.json({ 
      success: true,
      message: "Admin path works!",
      productCount: count,
      env: {
        hasDatabaseUrl: !!process.env.DATABASE_URL,
        nodeEnv: process.env.NODE_ENV
      }
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      prismaPath: "@/lib/prisma"
    }, { status: 500 })
  }
}
