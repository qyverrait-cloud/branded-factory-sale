#!/bin/bash

# Hostinger Deployment Script
# This script helps deploy your Next.js app to Hostinger

echo "🚀 Branded Factory Sale - Hostinger Deployment Script"
echo "=================================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed. Please install Node.js 18+ first.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Node.js version: $(node -v)${NC}"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo -e "${RED}❌ npm is not installed.${NC}"
    exit 1
fi

echo -e "${GREEN}✅ npm version: $(npm -v)${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}📦 Installing dependencies...${NC}"
npm install

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Failed to install dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Dependencies installed${NC}"
echo ""

# Build the project
echo -e "${YELLOW}🔨 Building project for production...${NC}"
npm run build

if [ $? -ne 0 ]; then
    echo -e "${RED}❌ Build failed${NC}"
    exit 1
fi

echo -e "${GREEN}✅ Build completed successfully${NC}"
echo ""

# Create deployment package info
echo -e "${YELLOW}📋 Files ready for deployment:${NC}"
echo ""
echo "Upload these files/folders to Hostinger public_html:"
echo "  ✅ .next/ (folder)"
echo "  ✅ public/ (folder)"
echo "  ✅ package.json"
echo "  ✅ package-lock.json"
echo "  ✅ next.config.mjs"
echo "  ✅ server.js"
echo "  ✅ .htaccess"
echo ""
echo -e "${YELLOW}📝 Next Steps:${NC}"
echo "1. Upload files to Hostinger via File Manager or FTP"
echo "2. Set environment variables in hPanel"
echo "3. Configure Node.js app in hPanel"
echo "4. Install dependencies on server: npm install --production"
echo "5. Start the application"
echo ""
echo -e "${GREEN}✅ Deployment package ready!${NC}"
echo ""
echo "For detailed instructions, see: HOSTINGER_DOMAIN_SETUP.md"

