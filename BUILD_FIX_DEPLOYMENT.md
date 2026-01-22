# ✅ Build Fix & Deployment Guide

## 🔧 Problem Fixed

**Issue:** Build was failing with syntax error in `app/api/admin/products/route.ts`

**Solution:** Fixed syntax error and cleaned up the file structure.

## ✅ Build Status

Build is now **successful**! 

```bash
npm run build
# ✓ Compiled successfully
```

## 📝 Build Warnings (Non-Critical)

These warnings are **normal** and won't prevent deployment:

1. **Dynamic Server Usage Warning** - API routes are dynamic by design (they need to handle query parameters)
2. **Viewport Metadata Warning** - Minor Next.js 14 metadata format warning (doesn't affect functionality)

## 🚀 Deployment Steps for Hostinger

### Step 1: Build Locally (Recommended)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### Step 2: Upload to Hostinger

**Option A: Via File Manager**
1. Login to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html`
4. Upload these files/folders:
   - `.next` folder (entire folder)
   - `public` folder (entire folder)
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - `prisma` folder
   - `node_modules` (or install on server)

**Option B: Via Git (Recommended)**
1. Push code to GitHub/GitLab
2. In Hostinger hPanel:
   - Go to **Advanced** → **Git**
   - Connect your repository
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - Set Node.js version: `18.x` or `20.x`

**Option C: Via SSH**
```bash
# Connect via SSH
ssh username@brandedfactorybhilwara.com

# Navigate to project
cd public_html

# Pull latest code (if using Git)
git pull

# Install dependencies
npm install --production

# Generate Prisma Client
npx prisma generate

# Build
npm run build
```

### Step 3: Set Environment Variables

**In Hostinger hPanel:**
1. Go to **Advanced** → **Environment Variables**
2. Add these variables:

```
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://brandedfactorybhilwara.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Important:**
- Use `localhost` (not remote host) for production
- No quotes around values
- No extra spaces

### Step 4: Generate Prisma Client on Server

**Via SSH or Terminal:**
```bash
cd public_html
npx prisma generate
```

This is **critical** - Prisma client must be generated on the server!

### Step 5: Verify Database Tables

**Via phpMyAdmin:**
1. hPanel → **Databases** → **phpMyAdmin**
2. Select database: `u136829732_brandedfactory`
3. Verify tables exist:
   - `Product`
   - `Category`
   - `Brand`
   - `ContactSubmission`

**If tables don't exist:**
```bash
cd public_html
npx prisma db push
```

### Step 6: Configure Node.js

**In Hostinger hPanel:**
1. Go to **Advanced** → **Node.js**
2. Set Node.js version: **18.x** or **20.x**
3. Set Application Root: `/public_html`
4. Set Application Startup File: `server.js` (if using custom server) or use `npm start`
5. Click **Start** or **Restart**

### Step 7: Test Deployment

1. **Health Check:**
   - Visit: `https://brandedfactorybhilwara.com/api/health`
   - Should return: `{"status":"ok","database":{"connected":true}}`

2. **Test Admin Panel:**
   - Visit: `https://brandedfactorybhilwara.com/admin`
   - Try adding a product
   - Check if it works

3. **Test Website:**
   - Visit homepage
   - Check catalogue
   - Test all features

## 🔧 Troubleshooting

### Build Fails on Server

**Solution:**
```bash
# Make sure you're in the right directory
cd public_html

# Clear cache and rebuild
rm -rf .next
npm run build
```

### Prisma Client Not Found

**Solution:**
```bash
cd public_html
npx prisma generate
```

### Database Connection Fails

**Check:**
1. DATABASE_URL is set correctly
2. Using `localhost` (not remote host) for production
3. Database credentials are correct
4. Database server is running

### Application Won't Start

**Check:**
1. Node.js version is 18+ (check: `node -v`)
2. All dependencies installed (`npm install`)
3. Prisma client generated (`npx prisma generate`)
4. Environment variables set correctly
5. Port is available (usually 3000)

## 📋 Quick Deployment Checklist

- [ ] Code pushed to Git (if using Git)
- [ ] Build successful locally (`npm run build`)
- [ ] Files uploaded to Hostinger
- [ ] Environment variables set
- [ ] Prisma client generated on server (`npx prisma generate`)
- [ ] Database tables exist
- [ ] Node.js configured in hPanel
- [ ] Application started/restarted
- [ ] Health check works
- [ ] Admin panel works
- [ ] Products can be added

## ✅ Success Indicators

After deployment, you should see:
- ✅ Build completes successfully
- ✅ Health endpoint returns `{"status":"ok"}`
- ✅ Admin panel loads
- ✅ Products can be added
- ✅ Website displays products
- ✅ No console errors

## 🆘 Still Having Issues?

1. **Check Server Logs:**
   - hPanel → Advanced → Node.js → View Logs
   - Or via SSH: `pm2 logs` (if using PM2)

2. **Check Browser Console:**
   - F12 → Console tab
   - Look for errors

3. **Test API Directly:**
   - Visit: `https://brandedfactorybhilwara.com/api/health`
   - Check response

4. **Verify Environment:**
   - Make sure all environment variables are set
   - Check DATABASE_URL format

---

**Last Updated:** After fixing build syntax error

