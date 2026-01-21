# 🚀 Automatic Database Table Creation Setup

This guide shows you how to automatically create all database tables with a single command.

## ✅ Quick Setup (One Command)

After setting up your `.env.local` file, run:

```bash
npm run db:setup
```

This single command will:
1. ✅ Generate Prisma Client
2. ✅ Test database connection
3. ✅ Create all database tables automatically
4. ✅ Verify tables are created

## 📋 Complete Setup Steps

### Step 1: Create `.env.local` file

Create `.env.local` in your project root:

```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### Step 2: Install Dependencies (First Time Only)

```bash
npm install
```

### Step 3: Run Automatic Setup

```bash
npm run db:setup
```

That's it! All tables will be created automatically.

## 🎯 Available Commands

### Automatic Setup Commands

```bash
# Full automatic setup (recommended)
npm run db:setup

# Alternative command (same as above)
npm run db:init

# Complete setup (install + database)
npm run setup
```

### Manual Commands (if needed)

```bash
# Generate Prisma Client only
npm run db:generate

# Create/update tables only
npm run db:push

# Open Prisma Studio (database GUI)
npm run db:studio
```

## 📊 Tables Created Automatically

The setup script creates these tables:

1. **Product** - Product information
   - Fields: id, name, brand, category, price, description, etc.

2. **Category** - Product categories
   - Fields: id, name, description, image

3. **Brand** - Product brands
   - Fields: id, name, category, logo, status

4. **ContactSubmission** - Contact form submissions
   - Fields: id, name, email, phone, message

## 🔄 What Happens When You Run `npm run db:setup`

1. **Checks Environment Variables**
   - Verifies `DATABASE_URL` is set
   - Shows error if not found

2. **Generates Prisma Client**
   - Creates database client for your app
   - Required for database operations

3. **Tests Database Connection**
   - Connects to your MySQL database
   - Verifies credentials are correct

4. **Creates Database Tables**
   - Creates all tables from `prisma/schema.prisma`
   - Updates existing tables if schema changed
   - Handles data loss gracefully

5. **Verifies Setup**
   - Confirms all tables are created
   - Shows success message

## 🛠️ For Production (Hostinger)

### On Hostinger Server:

1. **Set Environment Variables** in hPanel:
   ```
   DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   NODE_ENV=production
   CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
   ```

2. **Via SSH, run:**
   ```bash
   cd public_html
   npm run db:setup
   ```

## 🔧 Troubleshooting

### Error: DATABASE_URL not set

**Solution:** Create `.env.local` file with your database URL.

### Error: Can't reach database server

**Solution:** 
- For local development, use remote host: `srv2145.hstgr.io`
- For production, use `localhost` (works on Hostinger server)

### Error: Access denied

**Solution:** 
- Verify username and password
- Check database user has privileges
- Ensure user is added to database in hPanel

### Tables already exist

**Solution:** The script handles this automatically. It will update tables if schema changed.

## 📝 Script Details

The automatic setup uses `scripts/init-database.js` which:

- ✅ Validates environment variables
- ✅ Generates Prisma Client
- ✅ Tests database connection
- ✅ Creates/updates all tables
- ✅ Provides clear error messages
- ✅ Shows progress at each step

## 🎉 After Setup

Once tables are created:

1. **Start Development Server:**
   ```bash
   npm run dev
   ```

2. **Test API:**
   Visit: `http://localhost:3000/api/health`
   
   Should return:
   ```json
   {
     "status": "ok",
     "database": { "connected": true }
   }
   ```

3. **View Database:**
   ```bash
   npm run db:studio
   ```
   Opens at `http://localhost:5555`

## 🔄 Re-running Setup

You can safely run `npm run db:setup` multiple times:
- ✅ Updates tables if schema changed
- ✅ Doesn't delete existing data (unless schema requires it)
- ✅ Safe to run anytime

## 📚 Related Commands

```bash
# Full project setup (install + database)
npm run setup

# Database setup only
npm run db:setup

# View database in browser
npm run db:studio

# Manual table creation
npm run db:push
```

## ✅ Quick Checklist

- [ ] `.env.local` file created with `DATABASE_URL`
- [ ] Dependencies installed: `npm install`
- [ ] Run setup: `npm run db:setup`
- [ ] Tables created successfully
- [ ] Test API: `http://localhost:3000/api/health`

---

**One Command Setup:**
```bash
npm run db:setup
```

**Status:** ✅ Automatic Setup Ready

