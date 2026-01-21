#!/usr/bin/env node

/**
 * Database Setup Script
 * Automatically sets up database tables
 */

const { execSync } = require('child_process');

console.log('🗄️  Setting up database tables...\n');

try {
  // Generate Prisma Client
  console.log('📦 Generating Prisma Client...');
  execSync('npx prisma generate', { stdio: 'inherit' });
  
  // Create tables
  console.log('\n🗄️  Creating database tables...');
  execSync('npx prisma db push --accept-data-loss', { stdio: 'inherit' });
  
  console.log('\n✅ Database setup completed!');
} catch (error) {
  console.error('\n❌ Error:', error.message);
  process.exit(1);
}

