# ⚡ Hostinger Quick Start - 5 Minutes

## 🚀 Fastest Way to Deploy

### 1️⃣ Build Locally
```bash
npm install
npm run build
npm start  # Test it works
```

### 2️⃣ Upload to Hostinger

**Option A: Git (Easiest)**
- Push to GitHub/GitLab
- In hPanel: **Advanced** → **Git** → Connect repo → Deploy

**Option B: File Manager**
- Upload all files (except `node_modules` and `.next`) to `public_html`

### 3️⃣ Configure Node.js
- hPanel → **Advanced** → **Node.js**
- Create app: `branded-factory-sale`
- Version: `18.x` or `20.x`
- Startup: `server.js`
- Root: `/public_html`

### 4️⃣ Set Environment Variables
In hPanel → **Advanced** → **Environment Variables**:
```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
PORT=3000
```

### 5️⃣ Install & Start
Via SSH or Terminal:
```bash
cd public_html
npm install --production
npm run build
pm2 start server.js --name "branded-factory-sale"
pm2 save
```

### 6️⃣ SSL Certificate
- hPanel → **SSL** → Install Let's Encrypt
- Enable Force HTTPS

---

## ✅ Done!

Visit `https://yourdomain.com` to see your live site!

---

**Need detailed steps?** See [DEPLOY_TO_HOSTINGER.md](./DEPLOY_TO_HOSTINGER.md)

