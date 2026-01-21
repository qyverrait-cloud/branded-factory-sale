import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET single product by ID
export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    })

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      )
    }

    return NextResponse.json({
      product: {
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
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      success: true,
    })
  } catch (error) {
    console.error("Product API GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch product" },
      { status: 500 }
    )
  }
}

// PUT update product by ID
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id
    const body = await request.json()

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    const updateData: any = {}
    if (body.name) updateData.name = body.name
    if (body.brand) updateData.brand = body.brand
    if (body.category) updateData.category = body.category
    if (body.price !== undefined) updateData.price = Number(body.price)
    if (body.originalPrice !== undefined) updateData.originalPrice = Number(body.originalPrice)
    if (body.discount !== undefined) updateData.discount = Number(body.discount)
    if (body.description !== undefined) updateData.description = body.description
    if (body.image !== undefined) updateData.image = body.image
    if (body.specifications !== undefined) updateData.specifications = body.specifications
    if (body.segment !== undefined) updateData.segment = body.segment
    if (body.images !== undefined) updateData.images = body.images
    if (body.videos !== undefined) updateData.videos = body.videos
    if (body.inStock !== undefined) updateData.inStock = body.inStock
    if (body.rating !== undefined) updateData.rating = Number(body.rating)
    if (body.reviews !== undefined) updateData.reviews = Number(body.reviews)
    if (body.minOrder !== undefined) updateData.minOrder = Number(body.minOrder)

    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: updateData,
    })

    return NextResponse.json({ product, success: true })
  } catch (error) {
    console.error("Product API PUT error:", error)
    return NextResponse.json(
      { error: "Failed to update product" },
      { status: 500 }
    )
  }
}

// DELETE product by ID
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = params.id

    if (!id) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      )
    }

    await prisma.product.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    })
  } catch (error) {
    console.error("Product API DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to delete product" },
      { status: 500 }
    )
  }
}

