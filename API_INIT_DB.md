# 🗄️ API Database Initialization Endpoint

## `/api/init-db` - Automatic Database Setup

This API endpoint automatically creates all database tables and sets up your database.

## 🚀 Usage

### Via Browser/API Call

**GET Request:**
```
GET http://localhost:3000/api/init-db
```

**POST Request:**
```
POST http://localhost:3000/api/init-db
```

### Via cURL

```bash
# Local
curl http://localhost:3000/api/init-db

# Production
curl https://yourdomain.com/api/init-db
```

### Via Browser

Simply visit:
- Local: `http://localhost:3000/api/init-db`
- Production: `https://yourdomain.com/api/init-db`

## ✅ What It Does

1. **Tests Database Connection**
   - Verifies `DATABASE_URL` is working
   - Connects to MySQL database

2. **Generates Prisma Client**
   - Creates database client for your app
   - Required for database operations

3. **Creates Database Tables**
   - Creates all tables from `prisma/schema.prisma`:
     - `Product`
     - `Category`
     - `Brand`
     - `ContactSubmission`

4. **Verifies Tables**
   - Checks if tables were created
   - Returns table information

5. **Returns Status**
   - Success/failure status
   - Table names and counts
   - Timestamp

## 📋 Response Format

### Success Response:

```json
{
  "success": true,
  "message": "Database initialized successfully",
  "tables": {
    "created": ["Product", "Category", "Brand", "ContactSubmission"],
    "all": ["Product", "Category", "Brand", "ContactSubmission"],
    "expected": ["Product", "Category", "Brand", "ContactSubmission"]
  },
  "counts": {
    "Product": 0,
    "Category": 0,
    "Brand": 0,
    "ContactSubmission": 0
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### Error Response:

```json
{
  "success": false,
  "error": "Database initialization failed",
  "message": "Error details",
  "details": "Stack trace"
}
```

## 🔧 Requirements

1. **Environment Variable:**
   ```env
   DATABASE_URL="mysql://username:password@host:port/database"
   ```

2. **Prisma Schema:**
   - `prisma/schema.prisma` must exist
   - Must have valid schema definitions

3. **Database Access:**
   - Database must exist
   - User must have CREATE TABLE privileges

## 🎯 Use Cases

### 1. Initial Setup
After deploying, call this endpoint to create tables:
```
GET /api/init-db
```

### 2. Reset Database
If you need to recreate tables:
```
GET /api/init-db
```
(Note: Uses `--accept-data-loss` flag)

### 3. Automated Deployment
Add to deployment script:
```bash
curl https://yourdomain.com/api/init-db
```

### 4. Health Check
Verify database is set up:
```
GET /api/init-db
```
Check `success: true` in response

## 🔒 Security Note

**Important:** In production, consider adding authentication to this endpoint:

```typescript
// Add authentication check
const authHeader = request.headers.get("authorization")
if (authHeader !== `Bearer ${process.env.INIT_DB_SECRET}`) {
  return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
}
```

## 📝 Example Usage

### JavaScript/TypeScript:

```typescript
const response = await fetch("/api/init-db")
const data = await response.json()
console.log(data)
```

### Node.js Script:

```javascript
const https = require("https")
https.get("https://yourdomain.com/api/init-db", (res) => {
  let data = ""
  res.on("data", (chunk) => { data += chunk })
  res.on("end", () => console.log(JSON.parse(data)))
})
```

## 🚨 Troubleshooting

### Error: "Can't reach database server"
- Check `DATABASE_URL` is correct
- Verify database is running
- Check network/firewall settings

### Error: "Access denied"
- Verify database user has CREATE privileges
- Check username and password

### Error: "Unknown database"
- Database must exist before running
- Create database in Hostinger hPanel first

### Tables not created
- Check Prisma schema is valid
- Verify user has CREATE TABLE permission
- Check error message in response

## ✅ Status

**Endpoint:** `/api/init-db`  
**Methods:** GET, POST  
**Status:** ✅ Ready to Use

---

**One API call = All tables created automatically!** 🎉

