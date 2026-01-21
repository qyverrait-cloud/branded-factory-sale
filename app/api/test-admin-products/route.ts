import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const results: any = {
    timestamp: new Date().toISOString(),
    tests: [],
  }

  // Test 1: Database connection
  try {
    await prisma.$connect()
    results.tests.push({
      test: "Database Connection",
      status: "✓ PASS",
      time: Date.now(),
    })
  } catch (error: any) {
    results.tests.push({
      test: "Database Connection",
      status: "✗ FAIL",
      error: error.message,
      stack: error.stack?.split('\n').slice(0, 3),
    })
    return NextResponse.json(results, { status: 500 })
  }

  // Test 2: Fetch products
  try {
    const start = Date.now()
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
    })
    const duration = Date.now() - start
    results.tests.push({
      test: "Fetch Products",
      status: "✓ PASS",
      duration: `${duration}ms`,
      count: products.length,
      sample: products[0] ? {
        id: products[0].id,
        name: products[0].name,
        brand: products[0].brand,
      } : null,
    })
  } catch (error: any) {
    results.tests.push({
      test: "Fetch Products",
      status: "✗ FAIL",
      error: error.message,
      code: error.code,
      stack: error.stack?.split('\n').slice(0, 5),
    })
    return NextResponse.json(results, { status: 500 })
  }

  // Test 3: Count products
  try {
    const count = await prisma.product.count()
    results.tests.push({
      test: "Count Products",
      status: "✓ PASS",
      totalProducts: count,
    })
  } catch (error: any) {
    results.tests.push({
      test: "Count Products",
      status: "✗ FAIL",
      error: error.message,
    })
  }

  // Test 4: Fetch brands
  try {
    const brands = await prisma.brand.findMany()
    results.tests.push({
      test: "Fetch Brands",
      status: "✓ PASS",
      count: brands.length,
    })
  } catch (error: any) {
    results.tests.push({
      test: "Fetch Brands",
      status: "✗ FAIL",
      error: error.message,
    })
  }

  // Test 5: Fetch categories
  try {
    const categories = await prisma.category.findMany()
    results.tests.push({
      test: "Fetch Categories",
      status: "✓ PASS",
      count: categories.length,
    })
  } catch (error: any) {
    results.tests.push({
      test: "Fetch Categories",
      status: "✗ FAIL",
      error: error.message,
    })
  }

  await prisma.$disconnect()

  return NextResponse.json(results)
}
