# 🚀 Deploy to Hostinger - Step-by-Step Guide

This guide will walk you through deploying your Branded Factory Sale website to Hostinger hosting.

## 📋 Prerequisites

- ✅ Hostinger account with Node.js hosting (Business plan or higher)
- ✅ Domain name connected to Hostinger
- ✅ Git repository (GitHub/GitLab) - Optional but recommended
- ✅ SSH access enabled (check Hostinger hPanel)

---

## 🎯 Quick Start (5 Steps)

### Step 1: Build Your Project Locally

First, test and build your project on your computer:

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

Visit `http://localhost:3000` to verify everything works.

---

### Step 2: Upload Files to Hostinger

**Option A: Using Git (Recommended - Easiest)**

1. **Push your code to GitHub/GitLab** (if not already done)
2. **In Hostinger hPanel:**
   - Go to **Advanced** → **Git**
   - Click **Create Repository**
   - Connect your GitHub/GitLab account
   - Select your repository: `branded-factory-sale`
   - Set **Repository URL**: Your repo URL
   - Set **Branch**: `main` or `master`
   - Set **Directory**: `/public_html`
   - Click **Deploy**

**Option B: Using File Manager**

1. **Login to Hostinger hPanel**
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. **Upload these files/folders:**
   - `app/` folder
   - `components/` folder
   - `lib/` folder
   - `public/` folder
   - `hooks/` folder
   - `styles/` folder (if exists)
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - `tsconfig.json`
   - `postcss.config.mjs`
   - `.htaccess`
   - `server.js`
   - `components.json`

**⚠️ Do NOT upload:**
- `node_modules/` (will install on server)
- `.next/` (will build on server)
- `.env.local` (will create on server)
- `.git/` folder

---

### Step 3: Configure Node.js on Hostinger

1. **In hPanel**, go to **Advanced** → **Node.js**
2. **Create New Application:**
   - **App Name**: `branded-factory-sale`
   - **Node.js Version**: `18.x` or `20.x` (choose latest stable)
   - **App Mode**: `Production`
   - **App Root**: `/public_html`
   - **App Startup File**: `server.js`
   - **Port**: `3000` (default)
3. Click **Create**

---

### Step 4: Set Environment Variables

**In hPanel**, go to **Advanced** → **Environment Variables**:

Add these variables:

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
PORT=3000
```

**Replace `yourdomain.com` with your actual domain!**

---

### Step 5: Install Dependencies & Start

**Via SSH or Terminal in hPanel:**

```bash
# Navigate to your project directory
cd public_html

# Install production dependencies
npm install --production

# Build the project
npm run build

# Start the application (if using PM2)
pm2 start server.js --name "branded-factory-sale"

# Save PM2 configuration
pm2 save
pm2 startup
```

**Or use Node.js Manager in hPanel:**
- Go to **Advanced** → **Node.js**
- Find your app: `branded-factory-sale`
- Click **Start**

---

## 🔒 Step 6: Configure SSL Certificate

1. **In hPanel**, go to **SSL**
2. Click **Install SSL Certificate**
3. Select **Let's Encrypt** (Free)
4. Enable **Force HTTPS**
5. **Update `.htaccess`** - Uncomment HTTPS redirect:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

## 📧 Step 7: Setup Email Service (For Contact Form)

Your contact form needs an email service. Choose one:

### Option A: Resend (Recommended - Free tier available)

1. Sign up at https://resend.com
2. Get your API key
3. Add to environment variables in hPanel:
   ```
   RESEND_API_KEY=re_xxxxx
   ```
4. Update `app/api/contact/route.ts` to use Resend (code is already prepared)

### Option B: SendGrid

1. Sign up at https://sendgrid.com
2. Get API key
3. Add to environment variables:
   ```
   SENDGRID_API_KEY=SG.xxxxx
   ```

### Option C: Hostinger SMTP

1. Use Hostinger email SMTP settings
2. Add to environment variables:
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=your-email@yourdomain.com
   SMTP_PASS=your-password
   ```

---

## ✅ Step 8: Verify Deployment

Check these items:

- [ ] Website loads at `https://yourdomain.com`
- [ ] All pages work: Home, About, Catalogue, Contact
- [ ] Contact form submits successfully
- [ ] Admin panel accessible at `/admin`
- [ ] Images load correctly
- [ ] Mobile responsive design works
- [ ] Theme toggle works
- [ ] SSL certificate is active (HTTPS)
- [ ] No console errors in browser

---

## 🔧 Troubleshooting

### Issue: Site shows 500 Error

**Solutions:**
1. Check Node.js app is running in hPanel
2. Verify environment variables are set correctly
3. Check server logs: `pm2 logs branded-factory-sale`
4. Ensure `server.js` path is correct in Node.js settings

### Issue: API Routes Not Working

**Solutions:**
1. Ensure Node.js server is running
2. Check `NEXT_PUBLIC_SITE_URL` is set correctly
3. Verify API routes are accessible
4. Check server logs for errors

### Issue: Contact Form Not Sending Emails

**Solutions:**
1. Verify email service API key is correct
2. Check email service account status
3. Review server logs
4. Ensure `CONTACT_EMAIL` is set in environment variables

### Issue: Images Not Loading

**Solutions:**
1. Verify images are in `public/` folder
2. Check image paths in code
3. Clear browser cache
4. Verify `.htaccess` MIME types

---

## 📝 Important Commands

```bash
# Build project
npm run build

# Start production server
npm start

# PM2 commands
pm2 start server.js --name "branded-factory-sale"
pm2 list                    # View running apps
pm2 logs branded-factory-sale  # View logs
pm2 restart branded-factory-sale  # Restart app
pm2 stop branded-factory-sale     # Stop app
pm2 delete branded-factory-sale   # Remove app
```

---

## 🎉 You're Done!

Your website should now be live on Hostinger! 

**Next Steps:**
- Monitor site performance
- Set up regular backups
- Keep dependencies updated
- Monitor server resources in hPanel

---

## 📞 Need Help?

- **Hostinger Support**: Contact via hPanel
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: Check code comments

---

**Last Updated**: 2024
**Status**: Ready for Production ✅

