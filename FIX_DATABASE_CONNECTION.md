# 🔧 Fix Database Connection Error (P1001)

## ❌ Error You're Seeing

```
Error: P1001
Can't reach database server at `localhost:3306`
```

## 🔍 Problem

Your local machine doesn't have MySQL server running, or you need to use the remote Hostinger database connection.

## ✅ Solution 1: Use Remote Database Connection (Recommended)

Since your database is on Hostinger, use the remote connection string instead of `localhost`.

### Update `.env.local` file:

Change from:
```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory"
```

To:
```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory"
```

**Complete `.env.local` file:**

```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NODE_ENV=development
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

### Then run:

```bash
npx prisma db pull
npm run db:push
```

---

## ✅ Solution 2: Install Local MySQL Server (If you want local development)

If you want to run MySQL locally for development:

### Windows:

1. **Download MySQL:**
   - Visit: https://dev.mysql.com/downloads/installer/
   - Download MySQL Installer for Windows

2. **Install MySQL:**
   - Run installer
   - Choose "Developer Default"
   - Set root password
   - Complete installation

3. **Start MySQL Service:**
   - Open Services (Win + R → `services.msc`)
   - Find "MySQL80" or "MySQL"
   - Right-click → Start

4. **Create Database:**
   ```sql
   CREATE DATABASE u136829732_brandedfactory;
   CREATE USER 'u136829732_brandedfactory'@'localhost' IDENTIFIED BY 'Branded232323';
   GRANT ALL PRIVILEGES ON u136829732_brandedfactory.* TO 'u136829732_brandedfactory'@'localhost';
   FLUSH PRIVILEGES;
   ```

5. **Update `.env.local`:**
   ```env
   DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory"
   ```

### Mac:

```bash
# Install MySQL via Homebrew
brew install mysql

# Start MySQL
brew services start mysql

# Secure installation
mysql_secure_installation

# Create database and user
mysql -u root -p
```

Then run SQL commands from Solution 2 above.

### Linux (Ubuntu/Debian):

```bash
# Install MySQL
sudo apt update
sudo apt install mysql-server

# Start MySQL
sudo systemctl start mysql
sudo systemctl enable mysql

# Secure installation
sudo mysql_secure_installation

# Create database and user
sudo mysql -u root -p
```

Then run SQL commands from Solution 2 above.

---

## 🎯 Recommended Approach

**For Development:** Use **Solution 1** (Remote Connection) - It's easier and faster.

**For Production:** Already configured on Hostinger with `localhost` (which works on the server).

---

## 🔄 Quick Fix Commands

### If using remote connection (Solution 1):

```bash
# Update .env.local with remote host
# Then run:
npx prisma db pull
npm run db:generate
npm run db:push
```

### If using local MySQL (Solution 2):

```bash
# After installing MySQL and creating database:
npx prisma db pull
npm run db:generate
npm run db:push
```

---

## 🧪 Test Connection

After fixing, test the connection:

```bash
npx prisma db pull
```

Should see:
```
✔ Introspected X models
```

Or test via API:

```bash
npm run dev
# Visit: http://localhost:3000/api/health
```

---

## 📝 Environment Variables Summary

### For Local Development (Remote DB):
```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory"
```

### For Production (Hostinger):
```env
DATABASE_URL="mysql://u136829732_brandedfactory:Branded232323@localhost:3306/u136829732_brandedfactory"
```

**Note:** On Hostinger server, `localhost` works because MySQL is on the same server.

---

## ❓ Still Having Issues?

1. **Check if remote connection is allowed:**
   - In Hostinger hPanel → Databases
   - Check "Remote MySQL" settings
   - Add your IP address if needed

2. **Check firewall:**
   - Ensure port 3306 is not blocked

3. **Verify credentials:**
   - Double-check username, password, and database name

4. **Try both hosts:**
   - First try: `srv2145.hstgr.io`
   - If that doesn't work, try: `localhost` (only works on Hostinger server)

---

**Quick Fix:** Just change `localhost` to `srv2145.hstgr.io` in your `.env.local` file! ✅

