# 🗄️ Database Setup Guide

Complete guide for setting up MySQL database connection with your Next.js application.

## 📋 Your Database Configuration

**Database Name:** `u136829732_brandedfactory`  
**Database User:** `u136829732_brandedfactory`  
**Password:** `Branded232323`  
**Host:** `localhost` (or `srv2145.hstgr.io` for remote)  
**Port:** `3306`

## 🔧 Environment Variables Setup

### For Local Development

1. **Create `.env.local` file** in your project root:

```bash
# In your project root directory
touch .env.local
```

2. **Add your database URL:**

```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### For Production (Hostinger)

**Option 1: Via hPanel Environment Variables**

1. Login to Hostinger hPanel
2. Go to **Advanced** → **Environment Variables**
3. Add these variables:

```
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Option 2: Via .env.local file on server**

1. Via SSH, navigate to your project:
   ```bash
   cd public_html
   ```

2. Create `.env.local` file:
   ```bash
   nano .env.local
   ```

3. Paste your environment variables:
   ```env
   DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory"
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NODE_ENV=production
   CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
   ```

4. Save: `Ctrl+X`, then `Y`, then `Enter`

## 🔗 Database Connection String Format

### Standard Format:
```
mysql://username:password@host:port/database_name
```

### Your Connection String:
```
mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
```

### For Remote Connection (if localhost doesn't work):
```
mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
```

## ✅ Testing Database Connection

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Generate Prisma Client

```bash
npm run db:generate
```

### Step 3: Test Connection

```bash
npx prisma db pull
```

If successful, you'll see:
```
✔ Introspected X models
```

### Step 4: Create Database Tables

```bash
npm run db:push
```

This creates all tables:
- `Product`
- `Category`
- `Brand`
- `ContactSubmission`

### Step 5: Verify Connection via API

Start your development server:

```bash
npm run dev
```

Test health endpoint:
```
GET http://localhost:3000/api/health
```

Response should show:
```json
{
  "status": "ok",
  "database": {
    "connected": true
  }
}
```

## 🛠️ Database Commands

### Generate Prisma Client
```bash
npm run db:generate
```

### Create/Update Database Tables
```bash
npm run db:push
```

### Run Migrations
```bash
npm run db:migrate
```

### Open Prisma Studio (Database GUI)
```bash
npm run db:studio
```
Opens at `http://localhost:5555`

### Pull Database Schema
```bash
npx prisma db pull
```

## 🔍 Troubleshooting

### Issue: Connection Refused

**Error:** `ECONNREFUSED` or `Can't reach database server`

**Solutions:**
1. Verify database is active in Hostinger hPanel
2. Check if using correct host:
   - Try `localhost` first
   - If that doesn't work, try `srv2145.hstgr.io`
3. Verify port is `3306`
4. Check firewall settings

### Issue: Access Denied

**Error:** `Access denied for user 'u136829732_brandedfactory'@'localhost'`

**Solutions:**
1. Verify username and password are correct
2. Check in hPanel that user has privileges on database
3. Ensure user is added to the database
4. Try resetting database password in hPanel

### Issue: Unknown Database

**Error:** `Unknown database 'u136829732_brandedfactory'`

**Solutions:**
1. Verify database name is exactly: `u136829732_brandedfactory`
2. Check database exists in hPanel
3. Database names are case-sensitive

### Issue: Environment Variable Not Found

**Error:** `DATABASE_URL is not set`

**Solutions:**
1. Create `.env.local` file in project root
2. Add `DATABASE_URL` variable
3. Restart development server: `npm run dev`
4. For production, set in hPanel Environment Variables

### Issue: Prisma Client Not Generated

**Error:** `PrismaClient is not generated`

**Solutions:**
1. Run: `npm run db:generate`
2. Check if `@prisma/client` is installed: `npm list @prisma/client`
3. Ensure `postinstall` script runs: `npm run postinstall`

## 📝 Important Notes

1. **Never commit `.env.local` to Git** - it contains sensitive credentials
2. **Use `.env.example`** as a template (without real credentials)
3. **Different URLs for different environments:**
   - Development: `http://localhost:3000`
   - Production: `https://yourdomain.com`
4. **Host Selection:**
   - `localhost` - Usually works on Hostinger
   - `srv2145.hstgr.io` - Use if localhost doesn't work
5. **Password Security:**
   - Keep password secure
   - Don't share credentials
   - Use strong passwords

## 🚀 Quick Setup Checklist

- [ ] `.env.local` file created
- [ ] `DATABASE_URL` set correctly
- [ ] Dependencies installed: `npm install`
- [ ] Prisma Client generated: `npm run db:generate`
- [ ] Database connection tested: `npx prisma db pull`
- [ ] Database tables created: `npm run db:push`
- [ ] Health check working: `GET /api/health`

## 📞 Support

- **Database Issues**: Check Hostinger hPanel → Databases
- **Connection Issues**: Verify credentials and host
- **Prisma Issues**: See https://www.prisma.io/docs

---

**Your Database URL:**
```
mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
```

**Status:** ✅ Ready to Use

