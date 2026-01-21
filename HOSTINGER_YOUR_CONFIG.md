# 🔐 Your Hostinger Database Configuration

## ✅ Your Database Credentials

**Database Name:** `u136829732_brandedfactory`  
**Database User:** `u136829732_brandedfactory`  
**Password:** `Branded232323`  
**Host:** `srv2145.hstgr.io`  
**Port:** `3306` (default MySQL port)

## 🔗 Your DATABASE_URL Connection String

Copy this exact string to your environment variables:

```
mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
```

## 📝 Environment Variables for Hostinger

Set these in **Hostinger hPanel** → **Advanced** → **Environment Variables**:

```env
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

**Important:** Replace `https://yourdomain.com` with your actual domain name.

## 🚀 Quick Setup Steps

### Step 1: Set Environment Variables

**In Hostinger hPanel:**
1. Go to **Advanced** → **Environment Variables**
2. Add each variable above
3. Click **Save**

**Or create `.env.local` file on server:**
```bash
# Via SSH, navigate to your project
cd public_html

# Create .env.local file
nano .env.local

# Paste the environment variables
# Save: Ctrl+X, then Y, then Enter
```

### Step 2: Test Database Connection

```bash
# Generate Prisma Client
npm run db:generate

# Test connection (this will show if connection works)
npx prisma db pull

# Create database tables
npm run db:push
```

### Step 3: Verify Tables Created

You can verify tables were created by:

**Option A: Via phpMyAdmin**
1. hPanel → **Databases** → **phpMyAdmin**
2. Select your database: `u136829732_brandedfactory`
3. Check if these tables exist:
   - `Product`
   - `Category`
   - `Brand`
   - `ContactSubmission`

**Option B: Via Prisma Studio**
```bash
npx prisma studio
```
This opens a web interface at `http://localhost:5555`

## ✅ Connection Test

To test if your database connection works, run:

```bash
npx prisma db pull
```

If successful, you'll see:
```
✔ Introspected 0 models and wrote them into prisma/schema.prisma in XXXms
```

If there's an error, check:
1. Database credentials are correct
2. Database is active in hPanel
3. User has privileges on the database
4. Host `srv2145.hstgr.io` is accessible

## 🔒 Security Notes

⚠️ **Important Security Reminders:**

1. **Never commit `.env.local` to Git** - it contains sensitive credentials
2. **Keep your password secure** - don't share it
3. **Use environment variables in hPanel** instead of files when possible
4. **Regular backups** - backup your database regularly via hPanel

## 🛠️ Troubleshooting

### Issue: Connection Refused

**Error:** `ECONNREFUSED` or `Can't reach database server`

**Solution:**
- Verify host `srv2145.hstgr.io` is correct
- Check if database is active in hPanel
- Try using `localhost` instead if remote connection fails

### Issue: Access Denied

**Error:** `Access denied for user 'u136829732_brandedfactory'@'xxx'`

**Solution:**
- Verify username and password are correct
- Check in hPanel that user has privileges on database
- Ensure user is added to the database

### Issue: Unknown Database

**Error:** `Unknown database 'u136829732_brandedfactory'`

**Solution:**
- Verify database name is exactly: `u136829732_brandedfactory`
- Check database exists in hPanel
- Database names are case-sensitive

## 📋 Next Steps

After setting up the database connection:

1. ✅ Environment variables set
2. ✅ Database connection tested
3. ✅ Tables created (`npm run db:push`)
4. ✅ Application deployed
5. ✅ Start application: `npm start` or via PM2

## 🎯 Complete Deployment

Follow the main deployment guide: **`HOSTINGER_COMPLETE_DEPLOYMENT.md`**

---

**Your Database:** `u136829732_brandedfactory`  
**Host:** `srv2145.hstgr.io`  
**Status:** Ready to connect ✅

