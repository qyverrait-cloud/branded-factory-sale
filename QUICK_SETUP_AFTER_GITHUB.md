# ⚡ Quick Setup - After GitHub Deployment

Your code is already on Hostinger via GitHub. Just follow these 3 steps:

## 🎯 3 Simple Steps

### Step 1: Set Environment Variables (2 min)

**In Hostinger hPanel:**
1. **Advanced** → **Environment Variables**
2. Add these 4 variables:

```
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Replace `yourdomain.com` with your actual domain.**

### Step 2: Setup Database (2 min)

**Via SSH or Terminal in hPanel:**

```bash
cd public_html
npm install
npm run db:generate
npm run db:push
```

### Step 3: Start Application (1 min)

**Option A: Via hPanel**
- **Advanced** → **Node.js**
- Set version: `18.x`
- Set start: `npm start`
- Click **Start**

**Option B: Via SSH (PM2)**
```bash
npm install -g pm2
cd public_html
pm2 start npm --name "branded-factory-sale" -- start
pm2 save
```

## ✅ Done!

Visit your website: `https://yourdomain.com`

Test database: `https://yourdomain.com/api/products`

## 🔧 If Something Doesn't Work

**Database error?**
- Check `DATABASE_URL` is set correctly
- Run: `npm run db:generate` then `npm run db:push` again

**App won't start?**
- Check Node.js version (18+)
- View logs: `pm2 logs` or in hPanel

**Need more help?**
- See `HOSTINGER_GITHUB_DEPLOYED_SETUP.md` for detailed guide

---

**Your Database:**
`u136829732_brandedfactory` on `srv2145.hstgr.io`

