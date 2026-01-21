# Hostinger Deployment Guide for Branded Factory Sale

## Prerequisites

1. **Hostinger Account** with Node.js hosting support
2. **Domain** connected to Hostinger
3. **Node.js Version**: 18.x or higher
4. **Git** repository access

## Step 1: Prepare Your Project

### Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
```

### Build Configuration

The project is already configured for production with:
- ✅ Standalone output mode (optimized for hosting)
- ✅ Image optimization
- ✅ Code compression
- ✅ SWC minification
- ✅ Security headers

## Step 2: Build the Project Locally (Optional but Recommended)

```bash
# Install dependencies
npm install

# Build for production
npm run build

# Test the production build locally
npm start
```

## Step 3: Deploy to Hostinger

### Option A: Using Hostinger's File Manager

1. **Login to Hostinger hPanel**
2. Navigate to **File Manager**
3. Go to your domain's `public_html` folder
4. Upload all project files (except `node_modules`)

### Option B: Using Git (Recommended)

1. **Push your code to GitHub/GitLab**
2. In Hostinger hPanel:
   - Go to **Advanced** → **Git**
   - Connect your repository
   - Set build command: `npm run build`
   - Set start command: `npm start`
   - Set Node.js version: `18.x` or `20.x`

### Option C: Using SSH/Command Line

1. **Connect via SSH** to your Hostinger server
2. Navigate to your domain directory:
   ```bash
   cd domains/yourdomain.com/public_html
   ```
3. **Clone your repository**:
   ```bash
   git clone https://github.com/yourusername/branded-factory-sale.git .
   ```
4. **Install dependencies**:
   ```bash
   npm install --production
   ```
5. **Build the project**:
   ```bash
   npm run build
   ```
6. **Start the server**:
   ```bash
   npm start
   ```

## Step 4: Configure Node.js on Hostinger

1. In hPanel, go to **Advanced** → **Node.js**
2. **Create a new Node.js app**:
   - App name: `branded-factory-sale`
   - Node.js version: `18.x` or `20.x`
   - App mode: `Production`
   - App root: `/public_html`
   - App startup file: `server.js` (or `.next/standalone/server.js` if using standalone)
3. **Set environment variables**:
   - `NEXT_PUBLIC_SITE_URL`: Your domain URL
   - `NODE_ENV`: `production`

## Step 5: Configure Domain and SSL

1. **Point your domain** to Hostinger nameservers
2. **Enable SSL certificate** (Let's Encrypt - Free)
   - Go to **SSL** in hPanel
   - Enable SSL for your domain

## Step 6: Configure PM2 (Process Manager) - Recommended

If Hostinger supports PM2:

```bash
# Install PM2 globally
npm install -g pm2

# Start your app with PM2
pm2 start npm --name "branded-factory-sale" -- start

# Save PM2 configuration
pm2 save

# Setup PM2 to start on server reboot
pm2 startup
```

## Step 7: Verify Deployment

1. **Check if the site loads**: Visit `https://yourdomain.com`
2. **Test all pages**:
   - Homepage: `/`
   - Catalogue: `/catalogue`
   - About: `/about`
   - Contact: `/contact`
3. **Check API routes**: Test `/api/products`
4. **Verify SSL**: Ensure HTTPS is working

## Step 8: Performance Optimization

### Enable Caching

Add to your `.htaccess` (if using Apache):

```apache
# Cache static assets
<IfModule mod_expires.c>
  ExpiresActive On
  ExpiresByType image/jpg "access plus 1 year"
  ExpiresByType image/jpeg "access plus 1 year"
  ExpiresByType image/gif "access plus 1 year"
  ExpiresByType image/png "access plus 1 year"
  ExpiresByType image/webp "access plus 1 year"
  ExpiresByType text/css "access plus 1 month"
  ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Gzip compression
<IfModule mod_deflate.c>
  AddOutputFilterByType DEFLATE text/html text/plain text/xml text/css text/javascript application/javascript application/json
</IfModule>
```

### CDN Setup (Optional but Recommended)

Consider using Cloudflare or similar CDN for:
- Faster global content delivery
- DDoS protection
- Additional caching

## Troubleshooting

### Issue: Site shows 404 or doesn't load

**Solution:**
- Check Node.js app is running in hPanel
- Verify startup file path is correct
- Check server logs in hPanel

### Issue: API routes not working

**Solution:**
- Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
- Check API routes are in `app/api/` directory
- Verify server-side rendering is enabled

### Issue: Images not loading

**Solution:**
- Check image paths in `public/` folder
- Verify `next.config.mjs` image settings
- Clear browser cache

### Issue: Build fails

**Solution:**
- Check Node.js version (should be 18+)
- Verify all dependencies are installed
- Check build logs for specific errors

## Post-Deployment Checklist

- [ ] Site loads correctly on HTTPS
- [ ] All pages are accessible
- [ ] Contact form works
- [ ] Product catalogue loads
- [ ] Images display correctly
- [ ] Mobile responsive design works
- [ ] Theme toggle works
- [ ] WhatsApp integration works
- [ ] SEO meta tags are present
- [ ] Analytics is tracking (if configured)
- [ ] SSL certificate is active
- [ ] Site speed is optimized

## Maintenance

### Regular Updates

1. **Keep dependencies updated**:
   ```bash
   npm update
   ```

2. **Rebuild after updates**:
   ```bash
   npm run build
   ```

3. **Restart the app** (if using PM2):
   ```bash
   pm2 restart branded-factory-sale
   ```

### Monitoring

- Monitor server resources in Hostinger hPanel
- Check error logs regularly
- Monitor site performance with Google PageSpeed Insights

## Support

For Hostinger-specific issues, contact Hostinger support.
For application issues, check the project documentation or contact the development team.

---

**Note**: This guide assumes you have a Hostinger Business or higher plan with Node.js support. For shared hosting, you may need to use static export mode instead.

