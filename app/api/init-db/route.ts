import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  try {
    // Step 1: Test database connection
    await prisma.$connect()
    
    // Step 2: Create tables using raw SQL (more reliable than execSync)
    const createTables = async () => {
      try {
        // Create Product table
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS Product (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            brand VARCHAR(100) NOT NULL,
            category VARCHAR(50) NOT NULL,
            price INT NOT NULL,
            originalPrice INT DEFAULT 0,
            discount INT DEFAULT 0,
            rating FLOAT DEFAULT 0,
            reviews INT DEFAULT 0,
            minOrder INT DEFAULT 1,
            image VARCHAR(500) NOT NULL,
            description TEXT NOT NULL,
            specifications JSON,
            inStock BOOLEAN DEFAULT TRUE,
            segment VARCHAR(20),
            images JSON,
            videos JSON,
            createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
            updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            INDEX idx_category (category),
            INDEX idx_brand (brand),
            INDEX idx_segment (segment)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)

        // Create Category table
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS Category (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            description TEXT,
            image VARCHAR(500),
            createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
            updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)

        // Create Brand table
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS Brand (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(100) NOT NULL UNIQUE,
            category VARCHAR(50) NOT NULL,
            logo VARCHAR(500),
            description TEXT,
            status VARCHAR(20) DEFAULT 'active',
            createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
            updatedAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),
            INDEX idx_category (category),
            INDEX idx_status (status)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)

        // Create ContactSubmission table
        await prisma.$executeRawUnsafe(`
          CREATE TABLE IF NOT EXISTS ContactSubmission (
            id INT AUTO_INCREMENT PRIMARY KEY,
            name VARCHAR(255) NOT NULL,
            email VARCHAR(255) NOT NULL,
            phone VARCHAR(20) NOT NULL,
            company VARCHAR(255),
            message TEXT NOT NULL,
            createdAt DATETIME(3) DEFAULT CURRENT_TIMESTAMP(3),
            INDEX idx_email (email),
            INDEX idx_createdAt (createdAt)
          ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `)
      } catch (error: any) {
        // If tables already exist, that's okay
        if (!error.message?.includes("already exists")) {
          throw error
        }
      }
    }

    // Step 3: Create all tables
    await createTables()

    // Step 4: Verify tables exist by querying them
    const counts: Record<string, number> = {}
    const tableStatus: Record<string, boolean> = {}
    
    try {
      counts.Product = await prisma.product.count()
      tableStatus.Product = true
    } catch {
      tableStatus.Product = false
    }

    try {
      counts.Category = await prisma.category.count()
      tableStatus.Category = true
    } catch {
      tableStatus.Category = false
    }

    try {
      counts.Brand = await prisma.brand.count()
      tableStatus.Brand = true
    } catch {
      tableStatus.Brand = false
    }

    try {
      counts.ContactSubmission = await prisma.contactSubmission.count()
      tableStatus.ContactSubmission = true
    } catch {
      tableStatus.ContactSubmission = false
    }

    // Get all table names from database
    const tables = await prisma.$queryRaw<Array<Record<string, string>>>`
      SHOW TABLES
    `
    const tableNames = tables.map(t => Object.values(t)[0]).filter(Boolean)

    const expectedTables = ["Product", "Category", "Brand", "ContactSubmission"]
    const createdTables = expectedTables.filter(table => tableStatus[table])

    return NextResponse.json({
      success: true,
      message: "Database initialized successfully",
      tables: {
        created: createdTables,
        status: tableStatus,
        all: tableNames,
        expected: expectedTables,
      },
      counts,
      timestamp: new Date().toISOString(),
    })
  } catch (error: any) {
    console.error("Database initialization error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Database initialization failed",
        message: error.message || "Unknown error",
        hint: "Make sure DATABASE_URL is set correctly and database exists",
      },
      { status: 500 }
    )
  }
}

export async function POST() {
  // Same as GET, but can be called via POST too
  return GET()
}

