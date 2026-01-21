import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic'

// GET all brands
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get("category")
    const status = searchParams.get("status") || "active"

    const where: any = {}
    if (category) {
      where.category = category
    }
    if (status) {
      where.status = status
    }

    const brands = await prisma.brand.findMany({
      where,
      orderBy: { name: "asc" },
    })

    return NextResponse.json({ brands, success: true })
  } catch (error) {
    console.error("Brands API GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch brands", brands: [] },
      { status: 500 }
    )
  }
}

// POST create new brand
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, category, logo, description, status } = body

    if (!name || !category) {
      return NextResponse.json(
        { error: "Brand name and category are required" },
        { status: 400 }
      )
    }

    // Check if brand already exists
    const existing = await prisma.brand.findUnique({
      where: { name },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Brand already exists" },
        { status: 409 }
      )
    }

    const brand = await prisma.brand.create({
      data: {
        name,
        category,
        logo: logo || null,
        description: description || null,
        status: status || "active",
      },
    })

    return NextResponse.json({ brand, success: true }, { status: 201 })
  } catch (error) {
    console.error("Brands API POST error:", error)
    return NextResponse.json(
      { error: "Failed to create brand" },
      { status: 500 }
    )
  }
}

// PUT update brand
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, category, logo, description, status } = body

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      )
    }

    // If name is being updated, check for duplicates
    if (name) {
      const existing = await prisma.brand.findUnique({
        where: { name },
      })
      if (existing && existing.id !== Number(id)) {
        return NextResponse.json(
          { error: "Brand name already exists" },
          { status: 409 }
        )
      }
    }

    const updateData: any = {}
    if (name) updateData.name = name
    if (category) updateData.category = category
    if (logo !== undefined) updateData.logo = logo
    if (description !== undefined) updateData.description = description
    if (status) updateData.status = status

    const brand = await prisma.brand.update({
      where: { id: Number(id) },
      data: updateData,
    })

    return NextResponse.json({ brand, success: true })
  } catch (error) {
    console.error("Brands API PUT error:", error)
    return NextResponse.json(
      { error: "Failed to update brand" },
      { status: 500 }
    )
  }
}

// DELETE brand
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Brand ID is required" },
        { status: 400 }
      )
    }

    // Check if brand has products
    const brand = await prisma.brand.findUnique({
      where: { id: Number(id) },
    })

    if (brand) {
      const productsCount = await prisma.product.count({
        where: { brand: brand.name },
      })

      if (productsCount > 0) {
        return NextResponse.json(
          { error: `Cannot delete brand. ${productsCount} product(s) are using this brand.` },
          { status: 400 }
        )
      }
    }

    await prisma.brand.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ success: true, message: "Brand deleted successfully" })
  } catch (error) {
    console.error("Brands API DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to delete brand" },
      { status: 500 }
    )
  }
}

