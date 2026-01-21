import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Try to connect and run a simple query
    const startTime = Date.now()
    await prisma.$connect()
    const connectTime = Date.now() - startTime
    
    const queryStart = Date.now()
    const result = await prisma.$queryRaw`SELECT 1 as test`
    const queryTime = Date.now() - queryStart
    
    const productCount = await prisma.product.count()
    
    return NextResponse.json({
      success: true,
      connectTime: `${connectTime}ms`,
      queryTime: `${queryTime}ms`,
      productCount,
      message: "Database connection successful"
    })
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 5),
    }, { status: 500 })
  } finally {
    await prisma.$disconnect()
  }
}
