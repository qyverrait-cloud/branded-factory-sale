# 🚀 Hostinger Deployment - Complete Setup Guide

## ✅ Pre-Deployment Checklist

### 1. Local Testing
- [x] Website runs locally (`npm run dev`)
- [x] All pages work correctly
- [x] Contact form works
- [x] Admin panel accessible
- [x] All images load properly
- [x] Mobile responsive

### 2. Build Configuration
- [x] `next.config.mjs` set to `output: 'standalone'` ✅
- [x] `.htaccess` file configured ✅
- [x] Environment variables documented ✅

## 📦 Step-by-Step Deployment

### Step 1: Build the Project Locally

```bash
# Install dependencies (if not already done)
npm install

# Build for production
npm run build

# Test production build locally
npm start
```

### Step 2: Prepare Files for Upload

**Files to Upload to Hostinger:**
- ✅ `.next` folder (entire folder)
- ✅ `public` folder (entire folder)
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `next.config.mjs`
- ✅ `.htaccess` (upload to root)
- ✅ `node_modules` (or install on server)

**Files NOT to Upload:**
- ❌ `.env.local` (create on server)
- ❌ `.git` folder
- ❌ `README.md` (optional)
- ❌ Development files

### Step 3: Hostinger Configuration

#### A. Upload Files via File Manager

1. Login to Hostinger hPanel
2. Go to **File Manager**
3. Navigate to `public_html` folder
4. Upload all required files

#### B. Set Environment Variables

1. In hPanel, go to **Advanced** → **Environment Variables**
2. Add these variables:

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

Or create `.env.local` file in root directory:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

#### C. Configure Node.js

1. In hPanel, go to **Advanced** → **Node.js**
2. Set Node.js version: **18.x** or **20.x**
3. Set Application Root: `/public_html`
4. Set Application Startup File: `server.js` (if using custom server) or use `npm start`

#### D. Install Dependencies on Server

Via SSH or Terminal in hPanel:

```bash
cd public_html
npm install --production
```

#### E. Start the Application

**Option 1: Using PM2 (Recommended)**

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start npm --name "branded-factory-sale" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

**Option 2: Using Node.js Manager in hPanel**

1. Go to **Advanced** → **Node.js**
2. Set Start Command: `npm start`
3. Click **Start**

### Step 4: Configure Domain & SSL

1. **Point Domain to Hostinger:**
   - Update nameservers to Hostinger's nameservers
   - Wait for DNS propagation (24-48 hours)

2. **Install SSL Certificate:**
   - In hPanel, go to **SSL**
   - Install free Let's Encrypt SSL
   - Enable "Force HTTPS"

3. **Update .htaccess:**
   - Uncomment HTTPS redirect in `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### Step 5: Email Service Setup (For Contact Form)

Choose one option:

**Option A: Resend (Recommended - Free tier available)**

1. Sign up at https://resend.com
2. Get API key
3. Add to environment variables: `RESEND_API_KEY=re_xxxxx`
4. Update `app/api/contact/route.ts` to use Resend (code already prepared)

**Option B: SendGrid**

1. Sign up at https://sendgrid.com
2. Get API key
3. Add to environment variables: `SENDGRID_API_KEY=SG.xxxxx`

**Option C: SMTP (Hostinger Email)**

1. Use Hostinger email SMTP settings
2. Add to environment variables:
   ```
   SMTP_HOST=smtp.hostinger.com
   SMTP_PORT=465
   SMTP_USER=your-email@yourdomain.com
   SMTP_PASS=your-password
   ```

### Step 6: Final Verification

After deployment, check:

- [ ] Website loads at your domain
- [ ] All pages accessible (Home, About, Catalogue, Contact)
- [ ] Contact form submits successfully
- [ ] Admin panel accessible at `/admin`
- [ ] Images load correctly
- [ ] Mobile responsive works
- [ ] SSL certificate active (HTTPS)
- [ ] Theme toggle works
- [ ] WhatsApp links work
- [ ] No console errors

## 🔧 Troubleshooting

### Issue: 500 Internal Server Error

**Solutions:**
1. Check Node.js version (should be 18+)
2. Verify environment variables are set
3. Check server logs in hPanel
4. Ensure `.htaccess` syntax is correct
5. Verify all files uploaded correctly

### Issue: API Routes Not Working

**Solutions:**
1. Ensure Node.js server is running
2. Check if API routes are accessible
3. Verify CORS settings
4. Check server logs for errors
5. Ensure `CONTACT_EMAIL` environment variable is set

### Issue: Contact Form Not Sending Emails

**Solutions:**
1. Verify email service API key is correct
2. Check email service account status
3. Review server logs
4. Test email service connection
5. Ensure `CONTACT_EMAIL` is set in environment variables

### Issue: Images Not Loading

**Solutions:**
1. Verify images are in `public` folder
2. Check image paths in code
3. Verify `.htaccess` MIME types
4. Check browser console for errors
5. Ensure images are uploaded correctly

### Issue: Slow Loading

**Solutions:**
1. Enable caching in `.htaccess` (already done)
2. Optimize images (use WebP format)
3. Enable Gzip compression (already done)
4. Use CDN (Cloudflare recommended)
5. Check server resources in hPanel

## 📝 Important Notes

1. **Standalone Mode**: The project uses `output: 'standalone'` which creates a minimal production build optimized for hosting.

2. **Environment Variables**: Always set environment variables in hPanel or `.env.local` file on the server. Never commit `.env.local` to Git.

3. **PM2**: Using PM2 ensures your application keeps running even if the server restarts.

4. **SSL Certificate**: Always use HTTPS in production. Hostinger provides free SSL certificates.

5. **Backup**: Regularly backup your website files and database (if using).

6. **Updates**: Keep Next.js and dependencies updated for security and performance.

## 🎯 Quick Commands Reference

```bash
# Build project
npm run build

# Start production server
npm start

# Install dependencies
npm install --production

# PM2 commands
pm2 start npm --name "branded-factory-sale" -- start
pm2 list
pm2 logs branded-factory-sale
pm2 restart branded-factory-sale
pm2 stop branded-factory-sale
pm2 delete branded-factory-sale
```

## 📞 Support

- **Hostinger Support**: Contact via hPanel
- **Next.js Docs**: https://nextjs.org/docs
- **Project Issues**: Check code comments

---

**Last Updated**: 2024
**Version**: 1.0.0
**Status**: Production Ready ✅

