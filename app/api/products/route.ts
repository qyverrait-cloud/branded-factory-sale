import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const q = (searchParams.get("q") || "").toLowerCase()
    const category = searchParams.get("category") || "all"
    const brand = searchParams.get("brand") || "All Brands"
    const sortBy = searchParams.get("sort") || "name"
    const segment = searchParams.get("segment") || "all"

    // Build where clause
    const where: any = {}

    if (category !== "all") {
      where.category = category
    }

    if (category === "garments" && segment !== "all") {
      where.segment = segment
    }

    if (brand !== "All Brands") {
      where.brand = brand
    }

    // Get all products matching filters
    let products = await prisma.product.findMany({
      where,
      orderBy: getOrderBy(sortBy),
    })

    // Apply text search (client-side for simplicity, or use MySQL LIKE)
    if (q) {
      products = products.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.brand.toLowerCase().includes(q)
      )
    }

    // Get unique brands for facets
    const allProductsForFacets = await prisma.product.findMany({
      where: category !== "all" ? { category } : {},
      select: { brand: true },
      distinct: ["brand"],
    })

    const brandOptions = allProductsForFacets
      .map((p) => p.brand)
      .filter((b) => {
        if (category === "garments" && segment !== "all") {
          // Filter brands by segment for garments
          return true // You can add segment-based brand filtering here if needed
        }
        return true
      })
      .sort()

    // Apply limit if specified
    const limit = searchParams.get("limit")
    if (limit) {
      const limitNum = parseInt(limit, 10)
      if (!isNaN(limitNum) && limitNum > 0) {
        products = products.slice(0, limitNum)
      }
    }

    return NextResponse.json({
      products: products.map(formatProduct),
      facets: { brands: brandOptions },
    })
  } catch (error) {
    console.error("Products API error:", error)
    return NextResponse.json(
      { error: "Failed to fetch products", products: [], facets: { brands: [] } },
      { status: 500 }
    )
  }
}

function getOrderBy(sortBy: string) {
  switch (sortBy) {
    case "price-low":
      return { price: "asc" }
    case "price-high":
      return { price: "desc" }
    case "rating":
      return { rating: "desc" }
    case "name":
    default:
      return { name: "asc" }
  }
}

function formatProduct(product: any) {
  return {
    id: product.id.toString(),
    name: product.name,
    brand: product.brand,
    category: product.category,
    price: product.price,
    originalPrice: product.originalPrice || product.price,
    discount: product.discount || 0,
    rating: product.rating || 0,
    reviews: product.reviews || 0,
    minOrder: product.minOrder || 1,
    image: product.image,
    description: product.description || "",
    specifications: product.specifications || {},
    inStock: product.inStock !== false,
    segment: product.segment,
    images: product.images || [],
    videos: product.videos || [],
  }
}

