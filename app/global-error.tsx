'use client'

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <html>
      <body>
        <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px', textAlign: 'center' }}>
          <div>
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Something went wrong!</h2>
            <button onClick={() => reset()} style={{ padding: '0.5rem 1rem', backgroundColor: '#000', color: '#fff', borderRadius: '0.375rem', border: 'none', cursor: 'pointer' }}>
              Try again
            </button>
          </div>
        </div>
      </body>
    </html>
  )
}
