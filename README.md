# Branded Factory Sale - Premium Wholesale E-Commerce Website

A professional, high-performance wholesale e-commerce platform built with Next.js 14, featuring modern UI/UX, advanced animations, and optimized for Hostinger hosting.

## 🚀 Features

### Premium Features
- ✅ **Fully Responsive Design** - Mobile-first approach with perfect mobile, tablet, and desktop experience
- ✅ **Dark/Light Theme Toggle** - Seamless theme switching with smooth transitions
- ✅ **Advanced Animations** - Premium animations throughout the website including:
  - Floating product images with parallax effects
  - Smooth fade-in and slide-in animations
  - Interactive hover effects
  - Dynamic hero section with multiple animation styles
- ✅ **Dynamic Product Catalog** - Real-time product fetching with SWR caching
- ✅ **WhatsApp Integration** - Direct WhatsApp links for instant communication
- ✅ **Contact Form** - Professional contact form with email integration
- ✅ **SEO Optimized** - Complete SEO setup with meta tags, sitemap, and robots.txt
- ✅ **Performance Optimized** - Fast loading with lazy loading, image optimization, and caching
- ✅ **Professional UI/UX** - Modern design with premium touches

### Technical Features
- Next.js 14 with App Router
- TypeScript for type safety
- Tailwind CSS for styling
- SWR for data fetching and caching
- Sonner for toast notifications
- Next-themes for theme management
- Vercel Analytics integration

## 📦 Installation

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## 🔧 Configuration

1. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

2. Fill in your environment variables:
```env
NEXT_PUBLIC_SITE_URL=https://yourdomain.com
CONTACT_EMAIL=info@brandedfactorysale.com
# Add email service API keys (Resend, SendGrid, or SMTP)
```

## 🚀 Deployment to Hostinger

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Steps:
1. Build the application: `npm run build`
2. Upload files to Hostinger via FTP/SSH
3. Configure `.htaccess` file
4. Set environment variables
5. Start the server (if using Node.js hosting)

## 📁 Project Structure

```
├── app/
│   ├── api/              # API routes
│   ├── contact/          # Contact page
│   ├── catalogue/       # Product catalogue
│   ├── about/            # About page
│   ├── admin/            # Admin dashboard
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Homepage
├── components/
│   ├── ui/               # Reusable UI components
│   ├── header.tsx        # Header component
│   ├── footer.tsx        # Footer component
│   ├── hero-section.tsx  # Hero section
│   └── ...               # Other components
├── public/               # Static assets
├── .htaccess             # Hostinger server config
└── next.config.mjs       # Next.js configuration
```

## 🎨 Customization

### Colors
Edit `app/globals.css` to customize the color scheme.

### Animations
Modify animation keyframes in `app/globals.css` to adjust animation styles.

### Products
Update product data in `lib/mock-data.ts` or connect to your database.

## 📱 Mobile Responsiveness

The website is fully responsive with:
- Mobile-first design approach
- Touch-optimized interactions
- Responsive typography
- Adaptive layouts for all screen sizes

## ⚡ Performance

- Image lazy loading
- Code splitting
- SWR caching
- Gzip compression
- Browser caching
- Optimized fonts

## 🔒 Security

- XSS protection headers
- Content Security Policy ready
- Secure form handling
- Input validation

## 📞 Support

For support, contact:
- Email: info@brandedfactorysale.com
- Phone: +91 8003246909

## 📄 License

Proprietary - All rights reserved

---

**Built with ❤️ for Branded Factory Sale**

