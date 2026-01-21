# ✅ Hostinger Deployment Checklist

Use this checklist to ensure a smooth deployment to Hostinger with MySQL.

## 📋 Pre-Deployment

### Database Setup
- [ ] Created MySQL database in Hostinger hPanel
- [ ] Created database user with strong password
- [ ] Granted all privileges to user
- [ ] Noted down database credentials:
  - [ ] Host: `localhost` (or IP)
  - [ ] Port: `3306`
  - [ ] Database name: `u123456789_xxx`
  - [ ] Username: `u123456789_xxx`
  - [ ] Password: `xxx`

### Local Testing
- [ ] Tested database connection locally (optional)
- [ ] Built project successfully: `npm run build`
- [ ] Tested production build: `npm start`
- [ ] All pages working locally
- [ ] API endpoints tested

### Code Preparation
- [ ] Code pushed to Git repository (if using Git)
- [ ] All files ready for upload
- [ ] `.env.local` NOT included in upload (create on server)

## 🚀 Deployment Steps

### File Upload
- [ ] Files uploaded to `public_html` (via File Manager, Git, or SSH)
- [ ] All required folders uploaded:
  - [ ] `.next` (after build)
  - [ ] `public`
  - [ ] `prisma`
  - [ ] `server.js`
  - [ ] `package.json`
  - [ ] `next.config.mjs`

### Server Configuration
- [ ] Dependencies installed: `npm install`
- [ ] Node.js version set (18.x or 20.x)
- [ ] Node.js app created/configured in hPanel
- [ ] Application root set: `/public_html`
- [ ] Startup file/command set: `server.js` or `npm start`

### Environment Variables
- [ ] `DATABASE_URL` set (with correct credentials)
- [ ] `NEXT_PUBLIC_SITE_URL` set (your domain)
- [ ] `NODE_ENV` set to `production`
- [ ] `CONTACT_EMAIL` set
- [ ] SMTP credentials set (if using email)

### Database Setup on Server
- [ ] Prisma Client generated: `npm run db:generate`
- [ ] Database tables created: `npm run db:push`
- [ ] Verified tables exist (via phpMyAdmin or Prisma Studio)

### Application Start
- [ ] Node.js app started in hPanel
- [ ] Or PM2 configured and started
- [ ] Application running without errors

### Domain & SSL
- [ ] Domain pointed to Hostinger nameservers
- [ ] SSL certificate installed (Let's Encrypt)
- [ ] HTTPS redirect enabled
- [ ] `.htaccess` configured (if using Apache)

## ✅ Post-Deployment Verification

### Website Functionality
- [ ] Homepage loads: `https://yourdomain.com`
- [ ] All pages accessible:
  - [ ] `/` (Home)
  - [ ] `/catalogue` (Catalogue)
  - [ ] `/about` (About)
  - [ ] `/contact` (Contact)
  - [ ] `/admin` (Admin - if applicable)
- [ ] Images loading correctly
- [ ] Mobile responsive design works
- [ ] Theme toggle works (if applicable)

### Database Connection
- [ ] API endpoint works: `/api/products`
- [ ] Contact form saves to database
- [ ] Admin panel can access database (if applicable)
- [ ] No database connection errors in logs

### Performance
- [ ] Site loads quickly
- [ ] No console errors
- [ ] SSL certificate active (green lock)
- [ ] Caching enabled (if configured)

### Email (Contact Form)
- [ ] Contact form submits successfully
- [ ] Emails being sent (if SMTP configured)
- [ ] Email service API key valid (if using Resend/SendGrid)

## 🔧 Optional Enhancements

### Process Management
- [ ] PM2 installed and configured
- [ ] PM2 startup script configured
- [ ] PM2 monitoring set up

### Monitoring & Backups
- [ ] Database backup strategy in place
- [ ] Error logging configured
- [ ] Performance monitoring set up
- [ ] Regular backup schedule created

### Security
- [ ] Strong database passwords used
- [ ] Environment variables secured
- [ ] SSL certificate active
- [ ] Security headers configured (in next.config.mjs)

## 📝 Notes

**Database Connection String Format:**
```
mysql://username:password@host:port/database_name
```

**Important:**
- URL-encode special characters in password
- Never commit `.env.local` to Git
- Keep database credentials secure
- Regular backups recommended

## 🆘 Troubleshooting

If something doesn't work:

1. **Check Logs:**
   - PM2: `pm2 logs branded-factory-sale`
   - hPanel: Advanced → Node.js → View Logs

2. **Verify Environment Variables:**
   - Check all variables are set correctly
   - Verify `DATABASE_URL` format

3. **Test Database Connection:**
   - Run: `npx prisma db pull` (tests connection)
   - Check via phpMyAdmin in hPanel

4. **Check Application Status:**
   - Verify Node.js app is running
   - Check if port is correct
   - Verify all files uploaded

## 📞 Support

- **Hostinger Support**: Via hPanel
- **Documentation**: See other `.md` files in project
- **Prisma Docs**: https://www.prisma.io/docs

---

**Deployment Date**: _______________
**Deployed By**: _______________
**Domain**: _______________
**Status**: ⬜ In Progress | ⬜ Completed | ⬜ Issues

