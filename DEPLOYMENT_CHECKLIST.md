# ✅ Hostinger Deployment Checklist

## 🔧 Before Pushing to GitHub

### 1. Verify All Files Are Committed

```bash
# Check for uncommitted files
git status

# Make sure all components are committed
git add components/
git add app/
git add package.json
git add postcss.config.mjs
git add next.config.mjs
git add prisma/

# Commit if needed
git commit -m "Fix build dependencies for Hostinger"
git push
```

### 2. Verify package.json Changes

Make sure these are in `dependencies` (not `devDependencies`):
- ✅ `@tailwindcss/postcss`
- ✅ `postcss`
- ✅ `tailwindcss`

### 3. Test Build Locally

```bash
npm install
npm run build
```

Should complete without errors.

## 🚀 Hostinger Configuration

### Step 1: Update Build Settings

In Hostinger hPanel → **Advanced** → **Git**:

1. **Build Command:**
   ```bash
   npm install && npm run build
   ```

2. **Start Command:**
   ```bash
   npm start
   ```

3. **Node.js Version:** 18.x or 20.x

4. **Install Dependencies:** ✅ Enabled

### Step 2: Environment Variables

Set in hPanel → **Advanced** → **Environment Variables**:

```
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://brandedfactorybhilwara.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### Step 3: After Deployment

1. **Generate Prisma Client:**
   ```bash
   # Via SSH or Terminal
   cd public_html
   npx prisma generate
   ```

2. **Verify Database Tables:**
   - Check via phpMyAdmin
   - Or run: `npx prisma db push`

3. **Restart Application:**
   - hPanel → Advanced → Node.js → Restart

## ✅ Verification

After deployment:

1. ✅ Build completes successfully
2. ✅ Health check works: `https://brandedfactorybhilwara.com/api/health`
3. ✅ Website loads correctly
4. ✅ Admin panel accessible
5. ✅ Products can be added

## 🐛 Troubleshooting

### Build Still Fails

1. **Check Build Logs:**
   - hPanel → Advanced → Git → View Logs

2. **Verify Dependencies:**
   ```bash
   # Via SSH
   cd public_html
   npm list @tailwindcss/postcss
   npm list postcss
   npm list tailwindcss
   ```

3. **Clear and Rebuild:**
   ```bash
   rm -rf node_modules .next
   npm install
   npm run build
   ```

### Components Not Found

1. **Verify Files in Git:**
   ```bash
   git ls-files | grep components
   ```

2. **Ensure All Files Committed:**
   ```bash
   git add .
   git commit -m "Ensure all files committed"
   git push
   ```

---

**Last Updated:** After fixing Hostinger build dependencies
