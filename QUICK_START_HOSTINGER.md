# ⚡ Quick Start: Hostinger Deployment with MySQL

## 🎯 5-Minute Setup Guide

### Step 1: Create Database (2 minutes)

1. **hPanel** → **Databases** → **MySQL Databases**
2. Create database: `branded_factory`
3. Create user with password
4. Grant all privileges
5. **Note down credentials**

### Step 2: Get Connection String (1 minute)

Format:
```
mysql://u123456789_username:password@localhost:3306/u123456789_database
```

Replace:
- `u123456789_username` → Your database username
- `password` → Your database password  
- `u123456789_database` → Your database name

### Step 3: Deploy Code (1 minute)

**Option A: File Manager**
- Upload files to `public_html`

**Option B: Git**
- hPanel → **Advanced** → **Git**
- Connect repository
- Set build: `npm install && npm run build`
- Set start: `npm start`

### Step 4: Set Environment Variables (30 seconds)

In hPanel → **Advanced** → **Environment Variables**:

```
DATABASE_URL=mysql://u123456789_user:pass@localhost:3306/u123456789_db
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### Step 5: Setup Database (30 seconds)

**Via SSH or Terminal:**

```bash
cd public_html
npm install
npm run db:generate
npm run db:push
```

### Step 6: Start Application (30 seconds)

**In hPanel:**
- **Advanced** → **Node.js**
- Set Node.js version: `18.x`
- Set startup: `npm start` or `server.js`
- Click **Start**

**Or via SSH with PM2:**

```bash
npm install -g pm2
pm2 start npm --name "branded-factory-sale" -- start
pm2 save
```

## ✅ Done!

Visit `https://yourdomain.com` to see your site.

## 🔧 Troubleshooting

**Database connection error?**
- Check `DATABASE_URL` format
- Verify credentials in hPanel
- URL-encode special characters in password

**App won't start?**
- Check Node.js version (18+)
- Verify environment variables
- Check logs: `pm2 logs` or in hPanel

**Tables not created?**
- Run: `npm run db:push`
- Check database connection
- Verify Prisma Client generated: `npm run db:generate`

## 📚 Full Guides

- **Complete Setup**: See `HOSTINGER_COMPLETE_DEPLOYMENT.md`
- **Database Details**: See `HOSTINGER_MYSQL_SETUP.md`
- **General Deployment**: See `HOSTINGER_DEPLOYMENT.md`

---

**Need Help?** Check the detailed guides or contact Hostinger support.

