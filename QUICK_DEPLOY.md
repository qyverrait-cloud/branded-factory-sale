# ⚡ Quick Deployment Guide - Hostinger

## 🎯 Fastest Way to Deploy

### 1. Build Locally (2 minutes)

```bash
npm install
npm run build
```

### 2. Upload to Hostinger (5 minutes)

**Via File Manager:**
1. Login to hPanel → File Manager
2. Go to `public_html`
3. Upload these:
   - `.next` folder
   - `public` folder
   - `package.json`
   - `package-lock.json`
   - `next.config.mjs`
   - `server.js`
   - `.htaccess`

### 3. Configure in hPanel (3 minutes)

**Node.js Setup:**
1. hPanel → Advanced → Node.js
2. Create App:
   - Name: `branded-factory-sale`
   - Version: `18.x` or `20.x`
   - Root: `/public_html`
   - Startup: `server.js`

**Environment Variables:**
1. hPanel → Advanced → Environment Variables
2. Add:
   ```
   NODE_ENV=production
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   CONTACT_EMAIL=info@brandedfactorysale.com
   PORT=3000
   ```

### 4. Install & Start (2 minutes)

**Via Terminal in hPanel:**
```bash
cd public_html
npm install --production
```

**Start App:**
- hPanel → Node.js → Click "Start"

### 5. Domain & SSL (5 minutes)

1. **Domain:**
   - hPanel → Domains → Add Domain
   - Update nameservers if needed

2. **SSL:**
   - hPanel → SSL → Install Let's Encrypt
   - Enable Force HTTPS

### ✅ Done!

Visit: `https://yourdomain.com`

---

## 📞 Need Help?

- Full Guide: `HOSTINGER_DOMAIN_SETUP.md`
- Troubleshooting: See guide above
- Hostinger Support: hPanel → Support

**Total Time: ~15-20 minutes**

