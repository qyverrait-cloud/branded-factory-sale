/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Performance optimizations
  compress: true,
  poweredByHeader: false,
  reactStrictMode: false, // Disabled to prevent SSR issues
  swcMinify: true,
  // Hostinger deployment - enable standalone mode
  output: 'standalone', // Required for Hostinger deployment
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Disable static optimization completely
  generateBuildId: async () => {
    return 'build-' + Date.now()
  },
  // Skip trailing slash
  skipTrailingSlashRedirect: true,
  // Disable x-powered-by
  poweredByHeader: false,
  // Experimental features for better performance
  // Note: optimizeCss requires critters package, removed to avoid build errors
  // experimental: {
  //   optimizeCss: true,
  // },
  // Headers for security and performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
        ],
      },
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },
}

export default nextConfig
