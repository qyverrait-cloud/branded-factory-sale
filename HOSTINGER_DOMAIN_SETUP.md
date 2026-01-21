# 🌐 Hostinger Domain & Hosting Connection Guide

## 📋 Complete Step-by-Step Setup

### Step 1: Domain Configuration in Hostinger

#### A. Add Domain to Hostinger

1. **Login to Hostinger hPanel**
   - Go to https://hpanel.hostinger.com
   - Login with your credentials

2. **Add Your Domain**
   - Go to **Domains** → **Add Domain**
   - Enter your domain name (e.g., `yourdomain.com`)
   - Follow the prompts to add the domain

#### B. Point Domain to Hostinger Nameservers

**If domain is registered elsewhere (GoDaddy, Namecheap, etc.):**

1. **Get Hostinger Nameservers:**
   - In hPanel, go to **Domains** → **Your Domain**
   - Note down the nameservers (usually something like):
     - `ns1.dns-parking.com`
     - `ns2.dns-parking.com`

2. **Update Nameservers at Your Registrar:**
   - Login to your domain registrar (where you bought the domain)
   - Go to DNS/Nameserver settings
   - Replace existing nameservers with Hostinger's nameservers
   - Save changes

3. **Wait for DNS Propagation:**
   - Usually takes 24-48 hours
   - Check status at: https://www.whatsmydns.net

**If domain is registered with Hostinger:**
   - Nameservers are already configured
   - Skip to Step 2

---

### Step 2: Build Your Project Locally

```bash
# Make sure you're in the project directory
cd branded-factory-sale

# Install dependencies
npm install

# Build for production
npm run build

# Test locally (optional)
npm start
```

**Expected Output:**
- `.next` folder will be created
- Build should complete without errors

---

### Step 3: Upload Files to Hostinger

#### Option A: Using File Manager (Easiest)

1. **Login to Hostinger hPanel**
2. **Open File Manager**
   - Go to **Files** → **File Manager**
   - Navigate to `public_html` folder

3. **Upload Files:**
   - Click **Upload** button
   - Upload these files/folders:
     - ✅ `.next` folder (entire folder)
     - ✅ `public` folder (entire folder)
     - ✅ `package.json`
     - ✅ `package-lock.json`
     - ✅ `next.config.mjs`
     - ✅ `server.js`
     - ✅ `.htaccess`

4. **Extract if needed:**
   - If you uploaded as ZIP, extract it in `public_html`

#### Option B: Using FTP (FileZilla)

1. **Get FTP Credentials:**
   - In hPanel: **Files** → **FTP Accounts**
   - Note: Host, Username, Password, Port

2. **Connect via FileZilla:**
   - Host: `ftp.yourdomain.com` or IP address
   - Username: Your FTP username
   - Password: Your FTP password
   - Port: 21

3. **Upload Files:**
   - Navigate to `public_html` on server
   - Upload all required files

#### Option C: Using SSH (Advanced)

```bash
# Connect via SSH
ssh username@yourdomain.com

# Navigate to public_html
cd public_html

# Upload files using SCP (from your local machine)
scp -r .next public package.json package-lock.json next.config.mjs server.js .htaccess username@yourdomain.com:~/public_html/
```

---

### Step 4: Configure Node.js in Hostinger

1. **Go to Node.js Settings:**
   - In hPanel: **Advanced** → **Node.js**

2. **Create New Node.js App:**
   - Click **Create Application**
   - **App Name:** `branded-factory-sale`
   - **Node.js Version:** `18.x` or `20.x` (choose latest stable)
   - **App Mode:** `Production`
   - **App Root:** `/public_html`
   - **App Startup File:** `server.js`
   - **Port:** `3000` (or auto-assigned)

3. **Save Configuration**

---

### Step 5: Install Dependencies on Server

#### Via SSH Terminal in hPanel:

1. **Open Terminal:**
   - In hPanel: **Advanced** → **Terminal**

2. **Navigate and Install:**
   ```bash
   cd public_html
   npm install --production
   ```

#### Or via SSH:

```bash
ssh username@yourdomain.com
cd public_html
npm install --production
```

---

### Step 6: Set Environment Variables

#### Method 1: Via hPanel (Recommended)

1. **Go to Environment Variables:**
   - In hPanel: **Advanced** → **Environment Variables**

2. **Add Variables:**
   ```
  NODE_ENV=production
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
  PORT=3000
   ```

3. **Replace `yourdomain.com` with your actual domain**

#### Method 2: Create .env.local File

1. **Via File Manager:**
   - Create new file: `.env.local`
   - Add content:
   ```env
  NODE_ENV=production
  NEXT_PUBLIC_SITE_URL=https://yourdomain.com
  CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
  PORT=3000
   ```

2. **Save the file**

---

### Step 7: Start the Application

#### Option 1: Using Node.js Manager (Easiest)

1. **In hPanel:**
   - Go to **Advanced** → **Node.js**
   - Find your app: `branded-factory-sale`
   - Click **Start** button

#### Option 2: Using PM2 (Recommended for Production)

1. **Install PM2:**
   ```bash
   npm install -g pm2
   ```

2. **Start Application:**
   ```bash
   cd public_html
   pm2 start server.js --name "branded-factory-sale"
   ```

3. **Save PM2 Configuration:**
   ```bash
   pm2 save
   pm2 startup
   ```

4. **Check Status:**
   ```bash
   pm2 list
   pm2 logs branded-factory-sale
   ```

---

### Step 8: Configure Domain & SSL

#### A. Point Domain to Application

1. **In hPanel:**
   - Go to **Domains** → **Your Domain**
   - Click **Manage**

2. **DNS Settings:**
   - Add/Update A Record:
     - **Type:** A
     - **Name:** @ (or leave blank)
     - **Value:** Your server IP (get from hPanel)
     - **TTL:** 3600

3. **If using subdomain:**
   - Add A Record:
     - **Type:** A
     - **Name:** www
     - **Value:** Your server IP
     - **TTL:** 3600

#### B. Install SSL Certificate

1. **In hPanel:**
   - Go to **SSL** → **SSL Certificates**

2. **Install Let's Encrypt SSL:**
   - Select your domain
   - Click **Install SSL**
   - Choose **Let's Encrypt** (Free)
   - Click **Install**

3. **Enable Force HTTPS:**
   - After SSL is installed
   - Enable **Force HTTPS** option

4. **Update .htaccess:**
   - Uncomment HTTPS redirect (already in file):
   ```apache
   RewriteCond %{HTTPS} off
   RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
   ```

---

### Step 9: Configure Port & Proxy (If Needed)

If your Node.js app runs on port 3000, you may need to configure reverse proxy:

1. **Update .htaccess** (if using Apache):
   ```apache
   # Add this if Node.js runs on different port
   RewriteEngine On
   RewriteCond %{REQUEST_URI} !^/\.well-known
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

2. **Or configure in hPanel:**
   - Go to **Advanced** → **Node.js**
   - Set up reverse proxy if available

---

### Step 10: Verify Deployment

1. **Check Website:**
   - Visit: `https://yourdomain.com`
   - Should load your website

2. **Test Pages:**
   - Home: `https://yourdomain.com`
   - About: `https://yourdomain.com/about`
   - Catalogue: `https://yourdomain.com/catalogue`
   - Contact: `https://yourdomain.com/contact`
   - Admin: `https://yourdomain.com/admin`

3. **Check Console:**
   - Open browser DevTools (F12)
   - Check for errors
   - Verify HTTPS is working

---

## 🔧 Troubleshooting

### Issue: Domain Not Loading

**Solutions:**
1. Check DNS propagation: https://www.whatsmydns.net
2. Verify nameservers are correct
3. Wait 24-48 hours for DNS to propagate
4. Check A record points to correct IP

### Issue: 502 Bad Gateway

**Solutions:**
1. Check Node.js app is running
2. Verify port number is correct
3. Check server logs in hPanel
4. Restart Node.js application

### Issue: 500 Internal Server Error

**Solutions:**
1. Check environment variables are set
2. Verify all files uploaded correctly
3. Check server logs
4. Ensure dependencies are installed

### Issue: SSL Not Working

**Solutions:**
1. Wait for SSL certificate to activate (up to 24 hours)
2. Clear browser cache
3. Verify domain is pointing to Hostinger
4. Check SSL status in hPanel

---

## 📝 Quick Reference

### Important Files:
- `server.js` - Production server
- `.htaccess` - Apache configuration
- `.env.local` - Environment variables
- `next.config.mjs` - Next.js configuration

### Important Commands:
```bash
# Build
npm run build

# Start
npm start

# PM2
pm2 start server.js --name "branded-factory-sale"
pm2 restart branded-factory-sale
pm2 logs branded-factory-sale
```

### Important URLs:
- hPanel: https://hpanel.hostinger.com
- Your Website: https://yourdomain.com
- Admin Panel: https://yourdomain.com/admin

---

## ✅ Final Checklist

- [ ] Domain added to Hostinger
- [ ] Nameservers updated (if external domain)
- [ ] Files uploaded to `public_html`
- [ ] Node.js app configured
- [ ] Dependencies installed
- [ ] Environment variables set
- [ ] Application started
- [ ] SSL certificate installed
- [ ] HTTPS working
- [ ] All pages loading correctly
- [ ] Contact form working
- [ ] Admin panel accessible

---

**Need Help?**
- Hostinger Support: https://www.hostinger.com/contact
- Check server logs in hPanel
- Review error messages in browser console

**Status:** ✅ Ready for Deployment

