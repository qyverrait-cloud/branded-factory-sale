# ✅ Hostinger Deployment Checklist

## 🚀 Quick Deployment Steps

### 1. Local Testing (Before Deployment)
- [x] Run `npm run dev` - Website should open at http://localhost:3000
- [x] Test all pages: Home, About, Catalogue, Contact
- [x] Test contact form submission
- [x] Test admin panel at `/admin`
- [x] Check mobile responsiveness
- [x] Verify all images load

### 2. Build for Production
```bash
npm run build
npm start  # Test production build locally
```

### 3. Hostinger Upload Checklist

**Files to Upload:**
- [ ] `.next` folder (entire folder)
- [ ] `public` folder (entire folder)  
- [ ] `package.json`
- [ ] `package-lock.json`
- [ ] `next.config.mjs`
- [ ] `.htaccess` (to root directory)

**On Server:**
- [ ] Install dependencies: `npm install --production`
- [ ] Set environment variables in hPanel
- [ ] Configure Node.js (version 18+)
- [ ] Start application with PM2 or Node.js manager

### 4. Environment Variables (Set in hPanel)

```
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### 5. Post-Deployment Verification

- [ ] Website loads at your domain
- [ ] HTTPS/SSL is active
- [ ] All pages accessible
- [ ] Contact form works
- [ ] Admin panel works
- [ ] Images load correctly
- [ ] Mobile responsive
- [ ] No console errors

### 6. Email Service Setup (For Contact Form)

Choose one:
- [ ] Resend (Recommended) - Add `RESEND_API_KEY` to env vars
- [ ] SendGrid - Add `SENDGRID_API_KEY` to env vars  
- [ ] SMTP - Configure SMTP settings in env vars

## 📝 Important Notes

1. **Standalone Mode**: Already configured in `next.config.mjs`
2. **.htaccess**: Already configured for Hostinger
3. **Contact Page**: Fully editable from admin panel
4. **API Routes**: Will work with Node.js hosting

## 🔗 Quick Links

- Local Dev: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Contact Page: http://localhost:3000/contact

## 📚 Documentation

- Full Setup Guide: `HOSTINGER_SETUP.md`
- Deployment Guide: `DEPLOYMENT.md`
- Hostinger Guide: `HOSTINGER_DEPLOYMENT.md`

---

**Status**: ✅ Ready for Hostinger Deployment

