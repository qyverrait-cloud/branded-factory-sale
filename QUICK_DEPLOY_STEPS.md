# ⚡ Quick Deploy Steps - Vercel + Hostinger MySQL

## 🎯 Final Steps to Go Live

### Step 1: Install Dependencies & Setup Prisma

```bash
npm install
npx prisma generate
```

### Step 2: Create `.env.local` file

Create `.env.local` in project root:

```env
DATABASE_URL="mysql://u290229421_bfs_gb:YOUR_PASSWORD@mysql.hostinger.in:3306/u290229421_bfs_bhilwara"
CONTACT_EMAIL="brandedfactorysaleufc@gmail.com"
NODE_ENV="development"
```

**Replace `YOUR_PASSWORD` with your actual MySQL password.**

### Step 3: Push Database Schema

```bash
npx prisma db push
```

This creates tables in your Hostinger MySQL database.

### Step 4: Deploy to Vercel

```bash
# Install Vercel CLI (if not already)
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Follow prompts, then add environment variables:
vercel env add DATABASE_URL
# Paste: mysql://u290229421_bfs_gb:YOUR_PASSWORD@mysql.hostinger.in:3306/u290229421_bfs_bhilwara
# Select: Production, Preview, Development

vercel env add CONTACT_EMAIL
# Paste: brandedfactorysaleufc@gmail.com
# Select: Production, Preview, Development

vercel env add NODE_ENV
# Paste: production
# Select: Production only

# Deploy to production
vercel --prod
```

### Step 5: Connect Domain (Optional)

1. Vercel Dashboard → Project → Settings → Domains
2. Add your domain
3. Copy DNS records from Vercel
4. Add them in Hostinger hPanel → Domains → DNS
5. Wait 15-30 minutes

---

## ✅ Done!

Your website is now live with:
- ✅ Dynamic products from database
- ✅ Admin panel to manage products
- ✅ Contact form saves to database
- ✅ All features working

---

**Need help?** Check `VERCEL_DEPLOYMENT.md` for detailed guide.

