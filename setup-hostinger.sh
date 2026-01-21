#!/bin/bash

# Hostinger Database Setup Script
# Run this script on your Hostinger server via SSH

echo "🚀 Starting Hostinger Database Setup..."
echo ""

# Step 1: Navigate to project directory
echo "📁 Step 1: Navigating to project directory..."
cd public_html || cd domains/*/public_html || { echo "❌ Error: Could not find public_html directory"; exit 1; }
echo "✅ Current directory: $(pwd)"
echo ""

# Step 2: Install dependencies
echo "📦 Step 2: Installing dependencies..."
npm install
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to install dependencies"
    exit 1
fi
echo "✅ Dependencies installed"
echo ""

# Step 3: Generate Prisma Client
echo "🔧 Step 3: Generating Prisma Client..."
npm run db:generate
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to generate Prisma Client"
    echo "⚠️  Make sure DATABASE_URL is set in environment variables"
    exit 1
fi
echo "✅ Prisma Client generated"
echo ""

# Step 4: Create database tables
echo "🗄️  Step 4: Creating database tables..."
npm run db:push
if [ $? -ne 0 ]; then
    echo "❌ Error: Failed to create database tables"
    echo "⚠️  Check your DATABASE_URL connection string"
    exit 1
fi
echo "✅ Database tables created successfully"
echo ""

# Step 5: Verify connection
echo "🔍 Step 5: Verifying database connection..."
npx prisma db pull > /dev/null 2>&1
if [ $? -eq 0 ]; then
    echo "✅ Database connection verified"
else
    echo "⚠️  Warning: Could not verify connection (this might be okay)"
fi
echo ""

echo "🎉 Database setup completed!"
echo ""
echo "Next steps:"
echo "1. Make sure environment variables are set in hPanel"
echo "2. Start your application:"
echo "   - Via hPanel: Advanced → Node.js → Start"
echo "   - Via PM2: pm2 start npm --name 'branded-factory-sale' -- start"
echo ""

