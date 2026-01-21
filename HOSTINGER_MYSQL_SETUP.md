# 🗄️ Hostinger MySQL Database Setup Guide

This guide will help you connect your Next.js application to a Hostinger MySQL database and deploy it successfully.

## 📋 Prerequisites

1. **Hostinger Account** with MySQL database access
2. **Database Created** in Hostinger hPanel
3. **Database Credentials** (username, password, database name, host)

## Step 1: Create MySQL Database in Hostinger

### Via hPanel:

1. **Login to Hostinger hPanel**
2. Navigate to **Databases** → **MySQL Databases**
3. **Create a new database**:
   - Database name: `u123456789_branded_factory` (example)
   - Note down the full database name (includes user prefix)
4. **Create a database user**:
   - Username: `u123456789_dbuser` (example)
   - Password: Create a strong password
   - Note down these credentials
5. **Add user to database**:
   - Select the user and database
   - Grant all privileges
   - Click "Add"

### Database Credentials Format:

Hostinger typically uses this format:
- **Host**: `localhost` (for local connections) or `185.xxx.xxx.xxx` (for remote)
- **Port**: `3306` (default MySQL port)
- **Database Name**: `u123456789_database_name` (includes user prefix)
- **Username**: `u123456789_username` (includes user prefix)
- **Password**: Your chosen password

## Step 2: Configure Database Connection String

### Format for DATABASE_URL:

```
mysql://username:password@host:port/database_name
```

### Example for Hostinger:

```env
DATABASE_URL="mysql://u123456789_dbuser:YourPassword123@localhost:3306/u123456789_branded_factory"
```

### Important Notes:

1. **URL Encoding**: If your password contains special characters, URL-encode them:
   - `@` becomes `%40`
   - `#` becomes `%23`
   - `$` becomes `%24`
   - `%` becomes `%25`
   - `&` becomes `%26`
   - `+` becomes `%2B`
   - `=` becomes `%3D`
   - `?` becomes `%3F`

2. **Connection Pooling**: For production, you can add connection pool parameters:
   ```
   DATABASE_URL="mysql://user:pass@host:3306/db?connection_limit=5&pool_timeout=20"
   ```

## Step 3: Set Environment Variables

### Option A: Via Hostinger hPanel (Recommended)

1. In hPanel, go to **Advanced** → **Environment Variables**
2. Add the following variables:

```
DATABASE_URL=mysql://u123456789_dbuser:YourPassword123@localhost:3306/u123456789_branded_factory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### Option B: Via .env.local File

1. Create `.env.local` file in your project root (on the server)
2. Add the same variables as above
3. **Important**: Never commit `.env.local` to Git!

## Step 4: Test Database Connection Locally (Optional)

Before deploying, test the connection locally:

1. **Create `.env.local`** in your project root:
   ```env
   DATABASE_URL="mysql://u123456789_dbuser:YourPassword123@185.xxx.xxx.xxx:3306/u123456789_branded_factory"
   ```

2. **Test connection**:
   ```bash
   npx prisma db pull
   ```

   This will test if Prisma can connect to your database.

## Step 5: Run Database Migrations on Hostinger

### Via SSH (Recommended):

1. **Connect to Hostinger via SSH**:
   ```bash
   ssh username@yourdomain.com
   ```

2. **Navigate to your project directory**:
   ```bash
   cd domains/yourdomain.com/public_html
   ```

3. **Install dependencies** (if not already done):
   ```bash
   npm install
   ```

4. **Generate Prisma Client**:
   ```bash
   npx prisma generate
   ```

5. **Push database schema** (creates tables):
   ```bash
   npx prisma db push
   ```

   Or if you're using migrations:
   ```bash
   npx prisma migrate deploy
   ```

### Via Terminal in hPanel:

1. Go to **Advanced** → **Terminal**
2. Navigate to your project directory
3. Run the same commands as above

### What This Does:

- Creates all tables defined in `prisma/schema.prisma`:
  - `Product`
  - `Category`
  - `Brand`
  - `ContactSubmission`

## Step 6: Verify Database Connection

### Test Connection:

1. **Run Prisma Studio** (optional, for testing):
   ```bash
   npx prisma studio
   ```

2. **Check application logs** when starting the app:
   ```bash
   npm start
   ```

3. **Test API endpoints**:
   - Visit: `https://yourdomain.com/api/products`
   - Should return products (empty array if no data yet)

## Step 7: Seed Database (Optional)

If you want to add initial data:

1. **Create a seed script** (`prisma/seed.ts`):
   ```typescript
   import { PrismaClient } from '@prisma/client'
   const prisma = new PrismaClient()

   async function main() {
     // Add your seed data here
     await prisma.category.createMany({
       data: [
         { name: 'Electronics' },
         { name: 'Fashion' },
         // ... more categories
       ]
     })
   }

   main()
     .catch(console.error)
     .finally(() => prisma.$disconnect())
   ```

2. **Add to package.json**:
   ```json
   "prisma": {
     "seed": "ts-node prisma/seed.ts"
   }
   ```

3. **Run seed**:
   ```bash
   npx prisma db seed
   ```

## Troubleshooting

### Issue: Connection Refused

**Error**: `ECONNREFUSED` or `Can't reach database server`

**Solutions**:
1. Verify database host is correct (usually `localhost` for Hostinger)
2. Check if database is active in hPanel
3. Verify port is `3306`
4. Check firewall settings in Hostinger

### Issue: Access Denied

**Error**: `Access denied for user 'xxx'@'localhost'`

**Solutions**:
1. Verify username and password are correct
2. Check if user has privileges on the database
3. Ensure user is added to the database in hPanel
4. Try resetting the database password

### Issue: Unknown Database

**Error**: `Unknown database 'xxx'`

**Solutions**:
1. Verify database name is correct (includes user prefix)
2. Check if database exists in hPanel
3. Ensure database name matches exactly (case-sensitive)

### Issue: SSL Connection Required

**Error**: `SSL connection is required`

**Solutions**:
1. Add SSL parameter to connection string:
   ```
   DATABASE_URL="mysql://user:pass@host:3306/db?sslaccept=strict"
   ```
2. Or disable SSL (if allowed):
   ```
   DATABASE_URL="mysql://user:pass@host:3306/db?sslmode=disable"
   ```

### Issue: Prisma Client Not Generated

**Error**: `PrismaClient is not generated`

**Solutions**:
1. Run `npx prisma generate` after installing dependencies
2. Check if `@prisma/client` is installed: `npm list @prisma/client`
3. Ensure `postinstall` script runs: `npm run postinstall`

### Issue: Tables Not Created

**Error**: Tables don't exist

**Solutions**:
1. Run `npx prisma db push` to create tables
2. Check Prisma schema is correct
3. Verify database connection is working
4. Check for migration errors in console

## Security Best Practices

1. **Never commit `.env.local`** to version control
2. **Use strong passwords** for database users
3. **Limit database user privileges** (only grant what's needed)
4. **Use SSL connections** when possible
5. **Regular backups** of your database
6. **Keep Prisma and dependencies updated**

## Connection String Examples

### Standard Connection:
```
mysql://username:password@localhost:3306/database_name
```

### With Connection Pooling:
```
mysql://username:password@localhost:3306/database_name?connection_limit=5&pool_timeout=20
```

### With SSL:
```
mysql://username:password@localhost:3306/database_name?sslmode=require
```

### Remote Connection (if allowed):
```
mysql://username:password@185.xxx.xxx.xxx:3306/database_name
```

## Next Steps

After setting up the database:

1. ✅ Database connection configured
2. ✅ Tables created via Prisma migrations
3. ✅ Environment variables set
4. ✅ Application deployed
5. ✅ Test API endpoints
6. ✅ Add initial data (optional)

## Support

- **Hostinger Support**: Contact via hPanel for database issues
- **Prisma Docs**: https://www.prisma.io/docs
- **MySQL Docs**: https://dev.mysql.com/doc/

---

**Last Updated**: 2024
**Status**: Production Ready ✅

