#!/bin/bash

# Database Setup Script for Hostinger
# This script helps set up the database on Hostinger

echo "🚀 Hostinger Database Setup Script"
echo "=================================="
echo ""

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo "❌ Error: DATABASE_URL environment variable is not set"
    echo ""
    echo "Please set it in your .env.local file or environment variables:"
    echo "DATABASE_URL=\"mysql://username:password@localhost:3306/database_name\""
    exit 1
fi

echo "✅ DATABASE_URL is set"
echo ""

# Check if Prisma is installed
if ! command -v npx &> /dev/null; then
    echo "❌ Error: npx is not installed. Please install Node.js first."
    exit 1
fi

echo "📦 Generating Prisma Client..."
npx prisma generate

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to generate Prisma Client"
    exit 1
fi

echo "✅ Prisma Client generated successfully"
echo ""

echo "🗄️  Creating database tables..."
npx prisma db push

if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to create database tables"
    echo "Please check your DATABASE_URL and database connection"
    exit 1
fi

echo "✅ Database tables created successfully"
echo ""

echo "🎉 Database setup completed!"
echo ""
echo "Next steps:"
echo "1. Verify tables were created (check phpMyAdmin or run: npx prisma studio)"
echo "2. Add initial data if needed"
echo "3. Start your application: npm start"
echo ""

