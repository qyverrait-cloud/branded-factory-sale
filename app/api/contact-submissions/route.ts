import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

// Force dynamic rendering for API route
export const dynamic = 'force-dynamic'

// GET all contact submissions
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = searchParams.get("limit")
    const offset = searchParams.get("offset") || "0"
    const email = searchParams.get("email")

    const where: any = {}
    if (email) {
      where.email = email
    }

    const submissions = await prisma.contactSubmission.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit ? parseInt(limit, 10) : undefined,
      skip: parseInt(offset, 10),
    })

    const total = await prisma.contactSubmission.count({ where })

    return NextResponse.json({
      submissions,
      total,
      success: true,
    })
  } catch (error) {
    console.error("Contact submissions API GET error:", error)
    return NextResponse.json(
      { error: "Failed to fetch contact submissions", submissions: [] },
      { status: 500 }
    )
  }
}

// DELETE contact submission
export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json(
        { error: "Submission ID is required" },
        { status: 400 }
      )
    }

    await prisma.contactSubmission.delete({
      where: { id: Number(id) },
    })

    return NextResponse.json({
      success: true,
      message: "Contact submission deleted successfully",
    })
  } catch (error) {
    console.error("Contact submissions API DELETE error:", error)
    return NextResponse.json(
      { error: "Failed to delete contact submission" },
      { status: 500 }
    )
  }
}

