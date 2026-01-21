# 🚀 Complete Hostinger Deployment Guide with MySQL

This is a comprehensive guide for deploying your Next.js application to Hostinger with MySQL database connection.

## 📋 Pre-Deployment Checklist

- [ ] Hostinger account with Node.js hosting support
- [ ] MySQL database created in Hostinger
- [ ] Domain connected to Hostinger
- [ ] Database credentials ready
- [ ] Local build tested successfully

## Part 1: Database Setup

### Step 1.1: Create MySQL Database

1. Login to **Hostinger hPanel**
2. Go to **Databases** → **MySQL Databases**
3. Click **Create Database**
4. Fill in:
   - Database name: `branded_factory` (or your preferred name)
   - Note the full name: `u123456789_branded_factory`
5. Click **Create**

### Step 1.2: Create Database User

1. In **MySQL Databases** section
2. Scroll to **MySQL Users**
3. Click **Create User**
4. Fill in:
   - Username: `dbuser` (or your preferred name)
   - Password: Create a strong password
   - Note the full username: `u123456789_dbuser`
5. Click **Create**

### Step 1.3: Grant Privileges

1. In **MySQL Databases** section
2. Find **Add User To Database**
3. Select your user and database
4. Check **All Privileges**
5. Click **Add**

### Step 1.4: Get Connection Details

Note down these details:
- **Host**: `localhost` (or IP address if remote)
- **Port**: `3306`
- **Database Name**: `u123456789_branded_factory`
- **Username**: `u123456789_dbuser`
- **Password**: Your password

## Part 2: Local Preparation

### Step 2.1: Update Configuration

1. **Enable standalone mode** in `next.config.mjs` (already done)
2. **Create `.env.local`** for testing:
   ```env
   DATABASE_URL="mysql://u123456789_dbuser:YourPassword@localhost:3306/u123456789_branded_factory"
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NODE_ENV=production
   CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
   ```

### Step 2.2: Test Database Connection

```bash
# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Test connection (optional - if remote access enabled)
npx prisma db pull
```

### Step 2.3: Build Locally

```bash
# Build for production
npm run build

# Test production build
npm start
```

Visit `http://localhost:3000` to verify everything works.

## Part 3: Deploy to Hostinger

### Step 3.1: Upload Files

**Option A: Via File Manager (Simple)**

1. Login to **hPanel**
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Upload these files/folders:
   - `.next` (entire folder - after build)
   - `public` (entire folder)
   - `prisma` (entire folder)
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - `server.js`
   - `tsconfig.json`
   - `.htaccess` (if exists)

**Option B: Via Git (Recommended)**

1. **Push code to GitHub/GitLab**
2. In hPanel, go to **Advanced** → **Git**
3. **Connect repository**:
   - Repository URL: Your Git URL
   - Branch: `main` or `master`
   - Auto-deploy: Enable
4. **Set build settings**:
   - Build command: `npm install && npm run build`
   - Start command: `npm start`
   - Node.js version: `18.x` or `20.x`

**Option C: Via SSH**

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to project directory
cd domains/yourdomain.com/public_html

# Clone repository (if using Git)
git clone https://github.com/yourusername/branded-factory-sale.git .

# Or upload files via SFTP/SCP
```

### Step 3.2: Install Dependencies

**Via SSH or Terminal in hPanel:**

```bash
cd public_html
npm install --production
```

### Step 3.3: Set Environment Variables

**In hPanel:**

1. Go to **Advanced** → **Environment Variables**
2. Add these variables:

```
DATABASE_URL=mysql://u123456789_dbuser:YourPassword@localhost:3306/u123456789_branded_factory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Or create `.env.local` file:**

```bash
# Via SSH
cd public_html
nano .env.local
# Paste environment variables
# Save: Ctrl+X, Y, Enter
```

### Step 3.4: Generate Prisma Client

```bash
cd public_html
npm run db:generate
```

### Step 3.5: Create Database Tables

```bash
cd public_html
npm run db:push
```

This creates all tables (Product, Category, Brand, ContactSubmission).

### Step 3.6: Configure Node.js App

1. In hPanel, go to **Advanced** → **Node.js**
2. **Create/Edit Node.js App**:
   - App name: `branded-factory-sale`
   - Node.js version: `18.x` or `20.x`
   - App mode: `Production`
   - App root: `/public_html`
   - App startup file: `server.js`
   - Or start command: `npm start`
3. **Set Port**: Usually `3000` (check what Hostinger assigns)
4. **Click Start**

### Step 3.7: Configure Domain & SSL

1. **Point Domain**:
   - Update nameservers to Hostinger's
   - Wait for DNS propagation (24-48 hours)

2. **Enable SSL**:
   - Go to **SSL** in hPanel
   - Install **Let's Encrypt** (free)
   - Enable **Force HTTPS**

3. **Update .htaccess** (if using Apache):
   ```apache
   RewriteEngine On
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

## Part 4: Process Management (PM2)

### Step 4.1: Install PM2

```bash
npm install -g pm2
```

### Step 4.2: Start Application with PM2

```bash
cd public_html
pm2 start npm --name "branded-factory-sale" -- start
```

### Step 4.3: Configure PM2

```bash
# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
# Follow the instructions shown
```

### Step 4.4: PM2 Useful Commands

```bash
# View running apps
pm2 list

# View logs
pm2 logs branded-factory-sale

# Restart app
pm2 restart branded-factory-sale

# Stop app
pm2 stop branded-factory-sale

# Delete app
pm2 delete branded-factory-sale
```

## Part 5: Verification

### Step 5.1: Test Website

1. Visit `https://yourdomain.com`
2. Check all pages:
   - Home: `/`
   - Catalogue: `/catalogue`
   - About: `/about`
   - Contact: `/contact`
   - Admin: `/admin`

### Step 5.2: Test Database Connection

1. **Test API endpoint**:
   - Visit: `https://yourdomain.com/api/products`
   - Should return JSON (empty array if no products)

2. **Test contact form**:
   - Fill and submit contact form
   - Check if data is saved to database

3. **Check database**:
   ```bash
   # Via SSH, run Prisma Studio (optional)
   npx prisma studio
   # Or check via phpMyAdmin in hPanel
   ```

### Step 5.3: Check Logs

```bash
# PM2 logs
pm2 logs branded-factory-sale

# Or check Node.js logs in hPanel
# Advanced → Node.js → View Logs
```

## Part 6: Post-Deployment

### Step 6.1: Add Initial Data (Optional)

You can add initial categories, brands, and products via:

1. **Admin Panel**: `/admin` (if implemented)
2. **Prisma Studio**: `npx prisma studio`
3. **Direct SQL**: Via phpMyAdmin in hPanel
4. **Seed Script**: Create and run seed script

### Step 6.2: Configure Email (Contact Form)

Choose one option:

**Option A: Hostinger Email SMTP**

```env
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
```

**Option B: Resend (Recommended)**

1. Sign up at https://resend.com
2. Get API key
3. Add to environment variables:
   ```env
   RESEND_API_KEY=re_xxxxx
   ```

### Step 6.3: Performance Optimization

1. **Enable Caching** (already in `.htaccess`)
2. **Optimize Images** (use WebP format)
3. **Enable CDN** (Cloudflare recommended)
4. **Monitor Performance** (Google PageSpeed Insights)

## Troubleshooting

### Database Connection Issues

**Problem**: Can't connect to database

**Solutions**:
1. Verify `DATABASE_URL` is correct
2. Check database is active in hPanel
3. Verify user has privileges
4. Test connection via phpMyAdmin
5. Check for special characters in password (URL encode)

### Application Won't Start

**Problem**: Node.js app fails to start

**Solutions**:
1. Check Node.js version (should be 18+)
2. Verify all dependencies installed: `npm install`
3. Check environment variables are set
4. View logs: `pm2 logs` or in hPanel
5. Ensure `server.js` exists and is correct

### Tables Not Created

**Problem**: Database tables don't exist

**Solutions**:
1. Run `npm run db:push`
2. Verify Prisma schema is correct
3. Check database connection
4. Ensure Prisma Client is generated: `npm run db:generate`

### 500 Internal Server Error

**Problem**: Site shows 500 error

**Solutions**:
1. Check server logs
2. Verify environment variables
3. Check database connection
4. Ensure all files uploaded correctly
5. Verify Node.js app is running

### API Routes Not Working

**Problem**: API endpoints return errors

**Solutions**:
1. Check if Node.js server is running
2. Verify API routes exist in `app/api/`
3. Check CORS settings
4. Review server logs
5. Test database connection

## Maintenance

### Regular Updates

```bash
# Update dependencies
npm update

# Rebuild
npm run build

# Restart app
pm2 restart branded-factory-sale
```

### Database Backups

1. **Via hPanel**: Databases → phpMyAdmin → Export
2. **Via SSH**: Use mysqldump
3. **Automated**: Set up cron job for regular backups

### Monitoring

- Monitor server resources in hPanel
- Check error logs regularly
- Monitor site performance
- Track database size

## Quick Reference

### Essential Commands

```bash
# Build
npm run build

# Start
npm start

# Database
npm run db:generate
npm run db:push

# PM2
pm2 start npm --name "branded-factory-sale" -- start
pm2 logs branded-factory-sale
pm2 restart branded-factory-sale
```

### Environment Variables

```env
DATABASE_URL=mysql://user:pass@localhost:3306/db
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=your-email@domain.com
```

### File Structure on Server

```
public_html/
├── .next/              # Build output
├── public/             # Static files
├── prisma/             # Database schema
├── server.js           # Custom server
├── package.json        # Dependencies
├── .env.local          # Environment variables
└── ...
```

## Support Resources

- **Hostinger Support**: Via hPanel
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MySQL Docs**: https://dev.mysql.com/doc/

---

**Status**: Production Ready ✅
**Last Updated**: 2024

