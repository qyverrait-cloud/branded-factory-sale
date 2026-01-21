'use client'

import Link from 'next/link'

export default function NotFound() {
  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>404</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Page Not Found</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/" style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: '#fff', borderRadius: '0.375rem', textDecoration: 'none' }}>
            Return Home
          </Link>
        </div>
      </body>
    </html>
  )
}
