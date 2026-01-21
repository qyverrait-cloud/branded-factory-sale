'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <html lang="en">
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '4rem', fontWeight: 'bold', marginBottom: '1rem' }}>Error</h1>
          <h2 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>Something went wrong!</h2>
          <p style={{ marginBottom: '2rem', color: '#666' }}>
            We're sorry, but something unexpected happened. Please try again.
          </p>
          <button 
            onClick={reset}
            style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: '#fff', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' }}
          >
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
