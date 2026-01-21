# 🚀 Vercel Deployment Guide - Branded Factory Sale

## ✅ Prerequisites

- ✅ Vercel account (free) - Sign up at https://vercel.com
- ✅ Hostinger MySQL database created
- ✅ Database credentials ready

---

## 📋 Step 1: Install Dependencies Locally

```bash
npm install
```

---

## 📋 Step 2: Setup Prisma & Database

### A. Create `.env.local` file in project root:

```env
DATABASE_URL="mysql://u290229421_bfs_gb:YOUR_PASSWORD@mysql.hostinger.in:3306/u290229421_bfs_bhilwara"
CONTACT_EMAIL="brandedfactorysaleufc@gmail.com"
NODE_ENV="development"
```

**Replace `YOUR_PASSWORD` with your actual MySQL password.**

### B. Generate Prisma Client & Push Schema:

```bash
npx prisma generate
npx prisma db push
```

This will:
- Create tables in your Hostinger MySQL database
- Generate Prisma client for use in code

---

## 📋 Step 3: Seed Initial Data (Optional)

If you want to add sample products to database:

```bash
# Create a seed script (we'll create this)
npm run seed
```

Or manually add products via admin panel after deployment.

---

## 📋 Step 4: Deploy to Vercel

### Option A: Using Vercel CLI (Easiest - No GitHub needed)

1. **Install Vercel CLI globally:**
   ```bash
   npm install -g vercel
   ```

2. **Login to Vercel:**
   ```bash
   vercel login
   ```

3. **Deploy from project folder:**
   ```bash
   vercel
   ```

4. **Follow prompts:**
   - Set up and deploy? → `Y`
   - Which scope? → Select your account
   - Link to existing project? → `N` (new project)
   - Project name? → `branded-factory-sale`
   - Directory? → `.` (press Enter)
   - Override settings? → `N`

5. **After first deploy, set environment variables:**
   ```bash
   vercel env add DATABASE_URL
   # Paste: mysql://u290229421_bfs_gb:YOUR_PASSWORD@mysql.hostinger.in:3306/u290229421_bfs_bhilwara
   # Select: Production, Preview, Development (all)
   
   vercel env add CONTACT_EMAIL
   # Paste: brandedfactorysaleufc@gmail.com
   # Select: Production, Preview, Development (all)
   
   vercel env add NODE_ENV
   # Paste: production
   # Select: Production only
   ```

6. **Redeploy with environment variables:**
   ```bash
   vercel --prod
   ```

### Option B: Using Vercel Dashboard

1. **Push code to GitHub** (if you want)
2. **Go to vercel.com** → Login
3. **New Project** → Import Git Repository (or drag & drop)
4. **Configure:**
   - Framework Preset: Next.js
   - Root Directory: `.`
   - Build Command: `npm run build`
   - Output Directory: `.next`
5. **Environment Variables:**
   - Add `DATABASE_URL`
   - Add `CONTACT_EMAIL`
   - Add `NODE_ENV` = `production`
6. **Deploy**

---

## 📋 Step 5: Connect Domain (Hostinger)

1. **In Vercel Dashboard:**
   - Go to your project → **Settings** → **Domains**
   - Add your domain: `brandedfactorysale.com` (or your domain)

2. **Vercel will show DNS records:**
   - Note down the A record or CNAME record

3. **In Hostinger hPanel:**
   - Go to **Domains** → **DNS / Manage**
   - Add/Update DNS records as shown by Vercel:
     - **Type:** A or CNAME
     - **Name:** @ (or www)
     - **Value:** Vercel's IP or CNAME value
     - **TTL:** 3600

4. **Wait 15-30 minutes** for DNS propagation

5. **Visit your domain** → Website should load!

---

## 📋 Step 6: Verify Everything Works

- [ ] Website loads at your domain
- [ ] Homepage works
- [ ] Catalogue page loads products from database
- [ ] Admin panel accessible at `/admin`
- [ ] Can add/edit/delete products in admin
- [ ] Contact form submits and saves to database
- [ ] All pages responsive

---

## 🔧 Troubleshooting

### Issue: Database connection error

**Solution:**
1. Check `DATABASE_URL` in Vercel environment variables
2. Verify Hostinger MySQL database is accessible
3. Check if database user has correct permissions
4. Ensure Hostinger allows external connections (if needed)

### Issue: Build fails on Vercel

**Solution:**
1. Check build logs in Vercel dashboard
2. Ensure all dependencies are in `package.json`
3. Run `npm install` locally to check for errors
4. Check Prisma schema is valid: `npx prisma validate`

### Issue: Products not showing

**Solution:**
1. Check database has products: Login to Hostinger → phpMyAdmin → Check `Product` table
2. Verify API route works: Visit `https://yourdomain.com/api/products`
3. Check browser console for errors

### Issue: Admin panel not saving

**Solution:**
1. Check admin API routes are accessible
2. Verify database connection
3. Check Vercel function logs for errors

---

## 📝 Important Commands

```bash
# Local development
npm run dev

# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push

# View database in Prisma Studio
npx prisma studio

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod

# View Vercel logs
vercel logs
```

---

## 🎉 Done!

Your website is now live on Vercel with Hostinger MySQL database!

**Next Steps:**
- Add products via admin panel
- Customize content
- Monitor Vercel analytics
- Set up backups for database

---

**Need Help?**
- Vercel Docs: https://vercel.com/docs
- Prisma Docs: https://www.prisma.io/docs
- Hostinger Support: Contact via hPanel

