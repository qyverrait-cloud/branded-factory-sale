# 🚀 Hostinger Setup - Code Already Deployed via GitHub

Since your code is already deployed to Hostinger via GitHub, you just need to configure the database connection and set up the database tables.

## ✅ What's Already Done

- ✅ Code deployed via GitHub
- ✅ Files on Hostinger server
- ✅ Application structure ready

## 🎯 What You Need to Do Now

### Step 1: Set Environment Variables (2 minutes)

**In Hostinger hPanel:**

1. Go to **Advanced** → **Environment Variables**
2. Click **Add Variable** for each of these:

```env
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Important:** Replace `https://yourdomain.com` with your actual domain name.

3. Click **Save** for each variable

**OR** if you prefer using `.env.local` file:

1. Go to **File Manager** in hPanel
2. Navigate to `public_html` folder
3. Create new file: `.env.local`
4. Paste the environment variables above
5. Save the file

### Step 2: Access Server via SSH or Terminal (1 minute)

**Option A: Via SSH (Recommended)**

```bash
ssh username@yourdomain.com
```

**Option B: Via hPanel Terminal**

1. Go to **Advanced** → **Terminal**
2. Terminal will open in your browser

### Step 3: Navigate to Project Directory (30 seconds)

```bash
cd public_html
# or
cd domains/yourdomain.com/public_html
```

### Step 4: Install Dependencies (if not already done) (2 minutes)

```bash
npm install
```

This installs all required packages including Prisma and MySQL driver.

### Step 5: Generate Prisma Client (30 seconds)

```bash
npm run db:generate
```

This creates the Prisma Client needed to connect to your database.

### Step 6: Create Database Tables (30 seconds)

```bash
npm run db:push
```

This creates all the tables in your database:
- `Product`
- `Category`
- `Brand`
- `ContactSubmission`

You should see output like:
```
✔ Generated Prisma Client
✔ Pushed database schema
```

### Step 7: Verify Database Connection (Optional)

Test if connection works:

```bash
npx prisma db pull
```

If successful, you'll see:
```
✔ Introspected X models
```

### Step 8: Configure Node.js App (if not already done) (1 minute)

**In hPanel:**

1. Go to **Advanced** → **Node.js**
2. **Create/Edit Node.js App:**
   - App name: `branded-factory-sale`
   - Node.js version: `18.x` or `20.x`
   - App mode: `Production`
   - App root: `/public_html`
   - App startup file: `server.js` OR start command: `npm start`
3. **Set Environment Variables** (if not set globally):
   - Add the same variables from Step 1
4. Click **Start** or **Restart**

### Step 9: Start Application with PM2 (Recommended) (1 minute)

**Via SSH:**

```bash
# Install PM2 globally (if not already installed)
npm install -g pm2

# Start your application
cd public_html
pm2 start npm --name "branded-factory-sale" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
# Follow the instructions shown
```

**PM2 Useful Commands:**

```bash
# View running apps
pm2 list

# View logs
pm2 logs branded-factory-sale

# Restart app
pm2 restart branded-factory-sale

# Stop app
pm2 stop branded-factory-sale
```

## ✅ Verification Steps

### 1. Check Application is Running

Visit your website: `https://yourdomain.com`

### 2. Test Database Connection

Visit: `https://yourdomain.com/api/products`

Should return JSON (empty array `[]` if no products yet, or products if you have data).

### 3. Test Contact Form

1. Go to `/contact` page
2. Fill and submit the form
3. Check if it saves to database (via phpMyAdmin or Prisma Studio)

### 4. Verify Tables Created

**Via phpMyAdmin:**
1. hPanel → **Databases** → **phpMyAdmin**
2. Select database: `u136829732_brandedfactory`
3. Check if tables exist:
   - `Product`
   - `Category`
   - `Brand`
   - `ContactSubmission`

**Via Prisma Studio:**
```bash
cd public_html
npx prisma studio
```
Opens at `http://localhost:5555` (access via SSH tunnel if needed)

## 🔧 Troubleshooting

### Issue: Environment Variables Not Working

**Solution:**
- Verify variables are set in hPanel → Environment Variables
- Or check `.env.local` file exists in `public_html`
- Restart Node.js app after setting variables

### Issue: Database Connection Error

**Error:** `Can't reach database server` or `Access denied`

**Solutions:**
1. Verify `DATABASE_URL` is exactly:
   ```
   mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
   ```
2. Check database is active in hPanel
3. Verify user has privileges on database
4. Test connection via phpMyAdmin

### Issue: Tables Not Created

**Error:** `npm run db:push` fails

**Solutions:**
1. Check database connection first: `npx prisma db pull`
2. Verify Prisma Client generated: `npm run db:generate`
3. Check error message for specific issue
4. Ensure database user has CREATE privileges

### Issue: Application Won't Start

**Error:** Node.js app fails to start

**Solutions:**
1. Check Node.js version (should be 18+)
2. Verify all dependencies: `npm install`
3. Check logs: `pm2 logs` or in hPanel
4. Ensure `server.js` exists
5. Verify environment variables are set

### Issue: API Routes Return 500 Error

**Solutions:**
1. Check database connection
2. Verify Prisma Client generated: `npm run db:generate`
3. Check server logs for errors
4. Ensure tables exist: `npm run db:push`

## 📋 Quick Command Reference

```bash
# Navigate to project
cd public_html

# Install dependencies
npm install

# Generate Prisma Client
npm run db:generate

# Create database tables
npm run db:push

# Test database connection
npx prisma db pull

# Start application
npm start

# Or with PM2
pm2 start npm --name "branded-factory-sale" -- start
pm2 logs branded-factory-sale
```

## 🎯 Summary Checklist

- [ ] Environment variables set in hPanel (DATABASE_URL, etc.)
- [ ] Dependencies installed: `npm install`
- [ ] Prisma Client generated: `npm run db:generate`
- [ ] Database tables created: `npm run db:push`
- [ ] Node.js app configured and started
- [ ] Application running (check website)
- [ ] Database connection working (test API endpoint)
- [ ] Tables verified (check phpMyAdmin)

## 🚀 Next Steps After Setup

1. **Add Initial Data** (Optional):
   - Use Admin panel at `/admin`
   - Or use Prisma Studio: `npx prisma studio`
   - Or import via phpMyAdmin

2. **Configure Email** (for contact form):
   - Set up SMTP in environment variables
   - Or use Resend/SendGrid API

3. **Enable SSL** (if not already):
   - hPanel → **SSL**
   - Install Let's Encrypt certificate

4. **Monitor Application**:
   - Check PM2 logs regularly
   - Monitor database size
   - Set up backups

## 📞 Need Help?

- **Your Config**: See `HOSTINGER_YOUR_CONFIG.md`
- **Complete Guide**: See `HOSTINGER_COMPLETE_DEPLOYMENT.md`
- **Database Setup**: See `HOSTINGER_MYSQL_SETUP.md`
- **Hostinger Support**: Contact via hPanel

---

**Status**: Code Deployed ✅ | Database Setup Needed ⏳

**Your Database Connection:**
```
mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
```

