# Branded Factory Sale - Hostinger Deployment Guide

This guide will help you deploy the Branded Factory Sale website to Hostinger hosting.

## Prerequisites

- Hostinger hosting account with Node.js support (or use static export)
- Domain name configured
- FTP/SSH access to your Hostinger account
- Node.js 18+ installed locally (for building)

## Deployment Options

### Option 1: Node.js Server (Recommended for Full Features)

If your Hostinger plan supports Node.js:

1. **Build the Application Locally**
   ```bash
   npm install
   npm run build
   ```

2. **Upload Files to Hostinger**
   - Upload the entire `.next` folder
   - Upload `package.json` and `package-lock.json`
   - Upload `next.config.mjs`
   - Upload `public` folder
   - Upload `.htaccess` file to the root directory
   - Upload `server.js` (if using custom server)

3. **Install Dependencies on Server**
   ```bash
   npm install --production
   ```

4. **Set Environment Variables**
   - Create `.env.local` file on server with your configuration
   - See `.env.example` for required variables

5. **Start the Server**
   ```bash
   npm start
   ```

6. **Configure PM2 (for process management)**
   ```bash
   npm install -g pm2
   pm2 start npm --name "branded-factory-sale" -- start
   pm2 save
   pm2 startup
   ```

### Option 2: Static Export (Simpler, Limited Features)

If your Hostinger plan doesn't support Node.js:

1. **Modify `next.config.mjs`**
   ```javascript
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     // ... rest of config
   }
   ```

2. **Build Static Files**
   ```bash
   npm install
   npm run build
   ```

3. **Upload to Hostinger**
   - Upload the entire `out` folder contents to `public_html`
   - Upload `.htaccess` file to the root directory

4. **Note**: API routes won't work with static export. You'll need to:
   - Use external services for contact form (Formspree, Netlify Forms, etc.)
   - Or use a serverless function service

## Configuration Steps

### 1. Environment Variables

Create `.env.local` file on your server:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=info@brandedfactorysale.com
# Add other variables from .env.example
```

### 2. Email Service Setup

Choose one email service:

**Option A: Resend (Recommended)**
1. Sign up at https://resend.com
2. Get API key
3. Add to `.env.local`: `RESEND_API_KEY=re_xxxxx`
4. Update `app/api/contact/route.ts` to use Resend

**Option B: SendGrid**
1. Sign up at https://sendgrid.com
2. Get API key
3. Add to `.env.local`: `SENDGRID_API_KEY=SG.xxxxx`
4. Update `app/api/contact/route.ts` to use SendGrid

**Option C: SMTP (Nodemailer)**
1. Configure SMTP settings in `.env.local`
2. Install nodemailer: `npm install nodemailer`
3. Update `app/api/contact/route.ts` to use Nodemailer

### 3. SSL Certificate

1. Log in to Hostinger control panel
2. Go to SSL section
3. Install free SSL certificate (Let's Encrypt)
4. Force HTTPS by uncommenting in `.htaccess`:
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

### 4. Domain Configuration

1. Point your domain to Hostinger nameservers
2. Add domain in Hostinger control panel
3. Configure DNS records if needed

### 5. Performance Optimization

- Enable Gzip compression (already in `.htaccess`)
- Enable browser caching (already in `.htaccess`)
- Optimize images before uploading
- Use CDN if available (Cloudflare recommended)

## Post-Deployment Checklist

- [ ] Website loads correctly
- [ ] All pages are accessible
- [ ] Contact form works and sends emails
- [ ] Images load properly
- [ ] Mobile responsiveness works
- [ ] Theme toggle works
- [ ] WhatsApp links work
- [ ] SSL certificate is active
- [ ] Google Analytics is configured (if using)
- [ ] Google Search Console is set up
- [ ] Sitemap is generated and submitted
- [ ] robots.txt is configured
- [ ] 404 page works
- [ ] Performance is optimized (check PageSpeed Insights)

## Troubleshooting

### Issue: 500 Internal Server Error
- Check `.htaccess` syntax
- Verify Node.js version (should be 18+)
- Check server logs in Hostinger control panel
- Verify environment variables are set correctly

### Issue: API Routes Not Working
- Ensure Node.js server is running
- Check if API routes are accessible
- Verify CORS settings if needed
- Check server logs for errors

### Issue: Images Not Loading
- Verify image paths are correct
- Check if images are uploaded to `public` folder
- Verify `.htaccess` MIME types configuration
- Check browser console for errors

### Issue: Contact Form Not Sending Emails
- Verify email service API keys are correct
- Check email service account status
- Review server logs for errors
- Test email service connection

### Issue: Slow Loading
- Enable caching in `.htaccess`
- Optimize images (use WebP format)
- Enable Gzip compression
- Use CDN for static assets
- Check server resources in Hostinger panel

## Maintenance

### Regular Updates
- Keep Next.js and dependencies updated
- Monitor security advisories
- Backup database regularly (if using)
- Test after updates

### Monitoring
- Set up uptime monitoring
- Monitor error logs
- Track website performance
- Review analytics regularly

## Support

For issues specific to:
- **Hostinger**: Contact Hostinger support
- **Next.js**: Check Next.js documentation
- **Website Features**: Review code comments

## Additional Resources

- [Next.js Deployment Documentation](https://nextjs.org/docs/deployment)
- [Hostinger Knowledge Base](https://www.hostinger.com/tutorials)
- [Performance Optimization Guide](https://nextjs.org/docs/advanced-features/measuring-performance)

---

**Last Updated**: 2024
**Version**: 1.0.0

