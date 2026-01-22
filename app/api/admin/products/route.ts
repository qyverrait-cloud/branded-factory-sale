import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// GET all products
export async function GET() {
  try {
    const products = await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    })
    return NextResponse.json({ products })
  } catch (error) {
    console.error("Admin products GET error:", error)
    return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 })
  }
}

// POST create new product
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      brand,
      category,
      price,
      originalPrice,
      discount,
      description,
      image,
      specifications,
      segment,
      images,
      videos,
    } = body

    if (!name || !brand || !category || !price) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    const product = await prisma.product.create({
      data: {
        name,
        brand,
        category,
        price: Number(price),
        originalPrice: Number(originalPrice || price),
        discount: Number(discount || 0),
        description: description || "",
        image: image || "/placeholder.jpg",
        specifications: specifications || {},
        segment: segment || null,
        images: images || [],
        videos: videos || [],
        inStock: true,
        rating: 0,
        reviews: 0,
        minOrder: 1,
      },
    })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    console.error("Admin products POST error:", error)
    
    // Log detailed error for debugging
    if (error instanceof Error) {
      console.error("Error message:", error.message)
      console.error("Error stack:", error.stack)
      
      // Check if it's a Prisma error
      if (error.message.includes("P1001") || error.message.includes("Can't reach database")) {
        return NextResponse.json(
          {
            error: "Database connection failed. Please check your database configuration.",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
          },
          { status: 500 }
        )
      }
      
      if (error.message.includes("P2002") || error.message.includes("Unique constraint")) {
        return NextResponse.json(
          {
            error: "Product with this name already exists",
            details: process.env.NODE_ENV === "development" ? error.message : undefined,
          },
          { status: 400 }
        )
      }
      
      return NextResponse.json(
        {
          error: error.message || "Failed to create product",
          details: process.env.NODE_ENV === "development" ? error.stack : undefined,
        },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { error: "Unknown server error" },
      { status: 500 }
    )
  }


// PUT update product
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updateData } = body

    if (!id) {
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: {
        ...updateData,
        price: updateData.price ? Number(updateData.price) : undefined,
        originalPrice: updateData.originalPrice ? Number(updateData.originalPrice) : undefined,
        discount: updateData.discount ? Number(updateData.discount) : undefined,
      },
    })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    console.error("Admin products PUT error:", error)
    return NextResponse.json({ error: "Failed to update product" }, { status: 500 })
  }
}

// DELETE product
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      // Try to get ID from request body if not in query
      try {
        const body = await request.json()
        if (body.id) {
          await prisma.product.delete({
            where: { id: Number(body.id) },
          })
          return NextResponse.json({ success: true })
        }
      } catch {
        // Ignore
      }
      return NextResponse.json({ error: "Product ID is required" }, { status: 400 })
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Admin products DELETE error:", error)
    return NextResponse.json({ error: "Failed to delete product" }, { status: 500 })
  }
}

