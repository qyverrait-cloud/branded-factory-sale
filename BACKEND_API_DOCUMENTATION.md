# 🔌 Backend API Documentation

Complete API documentation for Branded Factory Sale backend with MySQL database connection.

## 📋 Base URL

```
https://yourdomain.com/api
```

## 🔐 Database Connection

The backend uses Prisma ORM to connect to MySQL database:
- **Database**: `u136829732_brandedfactory`
- **Host**: `srv2145.hstgr.io`
- **Connection**: Configured via `DATABASE_URL` environment variable

## 📚 API Endpoints

### Database Initialization

**GET/POST** `/api/init-db`

Automatically create all database tables. This endpoint:
- Tests database connection
- Generates Prisma Client
- Creates all tables (Product, Category, Brand, ContactSubmission)
- Verifies tables were created
- Returns status and table information

**Response:**
```json
{
  "success": true,
  "message": "Database initialized successfully",
  "tables": {
    "created": ["Product", "Category", "Brand", "ContactSubmission"],
    "all": ["Product", "Category", "Brand", "ContactSubmission"]
  },
  "counts": {
    "Product": 0,
    "Category": 0,
    "Brand": 0,
    "ContactSubmission": 0
  }
}
```

**Usage:**
- Visit: `http://localhost:3000/api/init-db`
- Or call via API: `GET /api/init-db`
- Automatically creates all tables

---

### Health Check

**GET** `/api/health`

Check API and database connection status.

**Response:**
```json
{
  "status": "ok",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "database": {
    "connected": true
  },
  "environment": "production"
}
```

---

### Products

#### Get All Products

**GET** `/api/products`

Get products with filtering, sorting, and pagination.

**Query Parameters:**
- `q` - Search query (string)
- `category` - Filter by category (string)
- `brand` - Filter by brand (string)
- `segment` - Filter by segment for garments (string: "mens", "womens", "kids")
- `sort` - Sort by: "name", "price-low", "price-high", "rating" (string)
- `limit` - Limit results (number)

**Example:**
```
GET /api/products?category=electronics&sort=price-low&limit=10
```

**Response:**
```json
{
  "products": [
    {
      "id": "1",
      "name": "Product Name",
      "brand": "Brand Name",
      "category": "electronics",
      "price": 9999,
      "originalPrice": 12999,
      "discount": 23,
      "rating": 4.5,
      "reviews": 120,
      "minOrder": 1,
      "image": "/product.jpg",
      "description": "Product description",
      "specifications": {},
      "inStock": true,
      "segment": null,
      "images": [],
      "videos": []
    }
  ],
  "facets": {
    "brands": ["Brand 1", "Brand 2"]
  }
}
```

#### Get Single Product

**GET** `/api/products/[id]`

Get product by ID.

**Response:**
```json
{
  "product": {
    "id": "1",
    "name": "Product Name",
    ...
  },
  "success": true
}
```

#### Create Product

**POST** `/api/admin/products`

Create a new product (Admin only).

**Body:**
```json
{
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "electronics",
  "price": 9999,
  "originalPrice": 12999,
  "discount": 23,
  "description": "Product description",
  "image": "/product.jpg",
  "specifications": {},
  "segment": null,
  "images": [],
  "videos": []
}
```

**Response:**
```json
{
  "product": { ... },
  "success": true
}
```

#### Update Product

**PUT** `/api/admin/products` or `/api/products/[id]`

Update existing product.

**Body:**
```json
{
  "id": 1,
  "name": "Updated Name",
  "price": 8999,
  ...
}
```

#### Delete Product

**DELETE** `/api/admin/products?id=1` or `/api/products/[id]`

Delete a product.

**Response:**
```json
{
  "success": true
}
```

---

### Categories

#### Get All Categories

**GET** `/api/categories`

Get all categories.

**Response:**
```json
{
  "categories": [
    {
      "id": 1,
      "name": "Electronics",
      "description": "Electronic products",
      "image": "/category.jpg",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "success": true
}
```

#### Create Category

**POST** `/api/categories`

Create a new category.

**Body:**
```json
{
  "name": "Electronics",
  "description": "Electronic products",
  "image": "/category.jpg"
}
```

#### Update Category

**PUT** `/api/categories`

Update existing category.

**Body:**
```json
{
  "id": 1,
  "name": "Updated Name",
  "description": "Updated description"
}
```

#### Delete Category

**DELETE** `/api/categories?id=1`

Delete a category (only if no products use it).

---

### Brands

#### Get All Brands

**GET** `/api/brands`

Get all brands with optional filtering.

**Query Parameters:**
- `category` - Filter by category (string)
- `status` - Filter by status: "active", "inactive" (string)

**Example:**
```
GET /api/brands?category=electronics&status=active
```

**Response:**
```json
{
  "brands": [
    {
      "id": 1,
      "name": "Brand Name",
      "category": "electronics",
      "logo": "/logo.jpg",
      "description": "Brand description",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "success": true
}
```

#### Create Brand

**POST** `/api/brands`

Create a new brand.

**Body:**
```json
{
  "name": "Brand Name",
  "category": "electronics",
  "logo": "/logo.jpg",
  "description": "Brand description",
  "status": "active"
}
```

#### Update Brand

**PUT** `/api/brands`

Update existing brand.

**Body:**
```json
{
  "id": 1,
  "name": "Updated Name",
  "status": "inactive"
}
```

#### Delete Brand

**DELETE** `/api/brands?id=1`

Delete a brand (only if no products use it).

---

### Contact

#### Submit Contact Form

**POST** `/api/contact`

Submit contact form.

**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210",
  "company": "Company Name",
  "message": "Your message here"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We'll get back to you soon."
}
```

#### Get Contact Submissions

**GET** `/api/contact-submissions`

Get all contact submissions (Admin).

**Query Parameters:**
- `limit` - Limit results (number)
- `offset` - Offset for pagination (number)
- `email` - Filter by email (string)

**Response:**
```json
{
  "submissions": [
    {
      "id": 1,
      "name": "John Doe",
      "email": "john@example.com",
      "phone": "9876543210",
      "company": "Company Name",
      "message": "Message text",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "total": 10,
  "success": true
}
```

#### Delete Contact Submission

**DELETE** `/api/contact-submissions?id=1`

Delete a contact submission.

---

## 🔒 Error Responses

All endpoints return standard error responses:

**400 Bad Request:**
```json
{
  "error": "Missing required fields"
}
```

**404 Not Found:**
```json
{
  "error": "Product not found"
}
```

**409 Conflict:**
```json
{
  "error": "Category already exists"
}
```

**500 Internal Server Error:**
```json
{
  "error": "Failed to fetch products"
}
```

## 📝 Database Schema

### Product
- `id` (Int, Primary Key)
- `name` (String)
- `brand` (String)
- `category` (String)
- `price` (Int)
- `originalPrice` (Int)
- `discount` (Int)
- `rating` (Float)
- `reviews` (Int)
- `minOrder` (Int)
- `image` (String)
- `description` (Text)
- `specifications` (JSON)
- `inStock` (Boolean)
- `segment` (String, nullable)
- `images` (JSON, nullable)
- `videos` (JSON, nullable)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Category
- `id` (Int, Primary Key)
- `name` (String, Unique)
- `description` (Text, nullable)
- `image` (String, nullable)
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### Brand
- `id` (Int, Primary Key)
- `name` (String, Unique)
- `category` (String)
- `logo` (String, nullable)
- `description` (Text, nullable)
- `status` (String: "active" | "inactive")
- `createdAt` (DateTime)
- `updatedAt` (DateTime)

### ContactSubmission
- `id` (Int, Primary Key)
- `name` (String)
- `email` (String)
- `phone` (String)
- `company` (String, nullable)
- `message` (Text)
- `createdAt` (DateTime)

## 🛠️ Testing API Endpoints

### Using cURL

```bash
# Get all products
curl https://yourdomain.com/api/products

# Get single product
curl https://yourdomain.com/api/products/1

# Create product
curl -X POST https://yourdomain.com/api/admin/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","brand":"Test Brand","category":"electronics","price":9999}'

# Health check
curl https://yourdomain.com/api/health
```

### Using Postman/Insomnia

1. Set base URL: `https://yourdomain.com/api`
2. Set headers: `Content-Type: application/json`
3. Use appropriate HTTP methods (GET, POST, PUT, DELETE)

## 🔧 Environment Variables

Required environment variables:

```env
DATABASE_URL=mysql://u136829732_brandedfactory:Branded232323@srv2145.hstgr.io:3306/u136829732_brandedfactory
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
NODE_ENV=production
CONTACT_EMAIL=brandedfactorysaleufc@gmail.com
```

## 📊 Database Connection Status

Check database connection:
```
GET /api/health
```

Response includes database connection status.

## 🚀 Next Steps

1. ✅ Backend APIs created
2. ✅ Database connection configured
3. ✅ All CRUD operations implemented
4. ⏳ Add authentication (if needed)
5. ⏳ Add rate limiting (if needed)
6. ⏳ Add request validation middleware

---

**Last Updated**: 2024
**Status**: Production Ready ✅

