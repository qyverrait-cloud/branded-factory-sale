# 🚀 Hostinger Deployment - Complete Guide

This project is now configured for deployment to Hostinger with MySQL database connection.

## 📚 Documentation Files

### Quick Start
- **`QUICK_START_HOSTINGER.md`** - 5-minute quick setup guide

### Detailed Guides
- **`HOSTINGER_COMPLETE_DEPLOYMENT.md`** - Complete step-by-step deployment guide
- **`HOSTINGER_MYSQL_SETUP.md`** - Detailed MySQL database setup and connection guide

### Checklists
- **`DEPLOYMENT_CHECKLIST_HOSTINGER.md`** - Deployment checklist to follow

### Existing Guides
- **`HOSTINGER_DEPLOYMENT.md`** - General Hostinger deployment (already existed)
- **`HOSTINGER_SETUP.md`** - Setup instructions (already existed)

## 🎯 What's Been Configured

### ✅ Configuration Changes

1. **`next.config.mjs`**
   - ✅ Standalone mode enabled for Hostinger deployment
   - ✅ Performance optimizations configured
   - ✅ Security headers set

2. **`package.json`**
   - ✅ Added database scripts:
     - `npm run db:generate` - Generate Prisma Client
     - `npm run db:push` - Create/update database tables
     - `npm run db:migrate` - Run migrations
     - `npm run db:studio` - Open Prisma Studio
   - ✅ Added `postinstall` script to auto-generate Prisma Client

3. **`server.js`**
   - ✅ Already configured for Hostinger production server

### 📝 Environment Variables Needed

Create `.env.local` on the server with:

```env
# Database Connection (Required)
DATABASE_URL="mysql://u123456789_username:password@localhost:3306/u123456789_database"

# Application Settings (Required)
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production

# Email Configuration (Required)
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com

# SMTP Configuration (Optional - for sending emails)
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=your-email@yourdomain.com
SMTP_PASS=your-email-password
```

**Important:** Replace the placeholder values with your actual Hostinger credentials.

## 🚀 Quick Deployment Steps

1. **Create MySQL Database** in Hostinger hPanel
2. **Get Database Credentials** (host, username, password, database name)
3. **Deploy Code** (via File Manager, Git, or SSH)
4. **Set Environment Variables** in hPanel
5. **Run Database Setup:**
   ```bash
   npm install
   npm run db:generate
   npm run db:push
   ```
6. **Start Application** (via Node.js manager or PM2)

See **`QUICK_START_HOSTINGER.md`** for detailed quick start guide.

## 📖 Database Connection Format

### Standard Format
```
mysql://username:password@host:port/database_name
```

### Hostinger Example
```
mysql://u123456789_dbuser:MyPassword123@localhost:3306/u123456789_branded_factory
```

### Important Notes

1. **URL Encoding**: If password contains special characters, encode them:
   - `@` → `%40`
   - `#` → `%23`
   - `$` → `%24`
   - `%` → `%25`
   - `&` → `%26`

2. **Connection Pooling** (optional):
   ```
   mysql://user:pass@host:3306/db?connection_limit=5&pool_timeout=20
   ```

## 🗄️ Database Schema

The application uses these tables (created automatically via Prisma):

- **Product** - Product information
- **Category** - Product categories
- **Brand** - Product brands
- **ContactSubmission** - Contact form submissions

## 🛠️ Available Scripts

```bash
# Development
npm run dev          # Start development server

# Production
npm run build        # Build for production
npm start            # Start production server

# Database
npm run db:generate  # Generate Prisma Client
npm run db:push      # Create/update database tables
npm run db:migrate   # Run database migrations
npm run db:studio    # Open Prisma Studio (database GUI)
```

## 📋 Deployment Checklist

Use **`DEPLOYMENT_CHECKLIST_HOSTINGER.md`** for a complete checklist.

### Essential Steps:
- [ ] Database created in Hostinger
- [ ] Environment variables set
- [ ] Code deployed
- [ ] Database tables created (`npm run db:push`)
- [ ] Application started
- [ ] SSL certificate installed
- [ ] Website tested

## 🔧 Troubleshooting

### Database Connection Issues

**Problem**: Can't connect to database

**Solutions**:
1. Verify `DATABASE_URL` format is correct
2. Check credentials in Hostinger hPanel
3. URL-encode special characters in password
4. Verify database is active
5. Check user has privileges

### Application Won't Start

**Solutions**:
1. Check Node.js version (18+)
2. Verify all dependencies: `npm install`
3. Check environment variables
4. View logs: `pm2 logs` or in hPanel

### Tables Not Created

**Solutions**:
1. Run: `npm run db:push`
2. Verify database connection
3. Check Prisma Client generated: `npm run db:generate`

See **`HOSTINGER_MYSQL_SETUP.md`** for detailed troubleshooting.

## 📞 Support

- **Hostinger Support**: Contact via hPanel
- **Prisma Docs**: https://www.prisma.io/docs
- **Next.js Docs**: https://nextjs.org/docs
- **MySQL Docs**: https://dev.mysql.com/doc/

## 📁 Project Structure

```
branded-factory-sale/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   └── ...
├── prisma/
│   └── schema.prisma      # Database schema
├── lib/
│   └── prisma.ts          # Prisma client
├── server.js              # Production server
├── next.config.mjs        # Next.js config (standalone enabled)
├── package.json           # Dependencies & scripts
└── [deployment guides]    # All .md files
```

## 🎉 Next Steps

1. **Read** `QUICK_START_HOSTINGER.md` for quick setup
2. **Follow** `DEPLOYMENT_CHECKLIST_HOSTINGER.md` step by step
3. **Refer to** `HOSTINGER_COMPLETE_DEPLOYMENT.md` for detailed instructions
4. **Check** `HOSTINGER_MYSQL_SETUP.md` for database-specific help

---

**Status**: ✅ Ready for Hostinger Deployment
**Last Updated**: 2024

