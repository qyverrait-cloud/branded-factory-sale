import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic'

// GET all categories
export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json({ categories, success: true })
  } catch (error) {
    console.error("Categories API GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch categories", categories: [] },
      { status: 500 }
    )
  }
}

// POST create new category
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, image } = body

    if (!name) {
      return NextResponse.json(
        { error: "Category name is required" },
        { status: 400 }
      )
    }

    // Check if category already exists
    const existing = await prisma.category.findUnique({
      where: { name },
    })

    if (existing) {
      return NextResponse.json(
        { error: "Category already exists" },
        { status: 409 }
      )
    }

    const category = await prisma.category.create({
      data: {
        name,
        description: description || null,
        image: image || null,
      },
    })

    return NextResponse.json({ category, success: true }, { status: 201 })
  } catch (error) {
    console.error("Categories API POST error:", error)
    return NextResponse.json(
      { error: "Failed to create category" },
      { status: 500 }
    )
  }
}

// PUT update category
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, name, description, image } = body

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      )
    }

    // If name is being updated, check for duplicates
    if (name) {
      const existing = await prisma.category.findUnique({
        where: { name },
      })
      if (existing && existing.id !== Number(id)) {
        return NextResponse.json(
          { error: "Category name already exists" },
          { status: 409 }
        )
      }
    }

    const category = await prisma.category.update({
      where: { id: Number(id) },
      data: {
        ...(name && { name }),
        ...(description !== undefined && { description }),
        ...(image !== undefined && { image }),
      },
    })

    return NextResponse.json({ category, success: true })
  } catch (error) {
    console.error("Categories API PUT error:", error)
    return NextResponse.json(
      { error: "Failed to update category" },
      { status: 500 }
    )
  }
}

// DELETE category
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Category ID is required" },
        { status: 400 }
      )
    }

    // Check if category has products
    const category = await prisma.category.findUnique({
      where: { id: Number(id) },
    })

    if (!category) {
      return NextResponse.json(
        { error: "Category not found" },
        { status: 404 }
      )
    }

    const productsInCategory = await prisma.product.count({
      where: { category: category.name },
    })

    if (productsInCategory > 0) {
      return NextResponse.json(
        { error: `Cannot delete category. ${productsInCategory} product(s) are using this category.` },
        { status: 400 }
      )
    }

    await prisma.category.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({ success: true, message: "Category deleted successfully" })
  } catch (error) {
    console.error("Categories API DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to delete category" },
      { status: 500 }
    )
  }
}

