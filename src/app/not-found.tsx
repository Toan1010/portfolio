import Link from 'next/link'

export default function RootNotFound() {
  return (
    <html lang="vi">
      <head>
        <title>404 - Không tìm thấy trang</title>
      </head>
      <body style={{
        backgroundColor: '#09090b',
        color: '#ffffff',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        margin: 0,
        padding: '24px',
        boxSizing: 'border-box',
        textAlign: 'center'
      }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxWidth: '400px' }}>
          <div style={{ fontSize: '80px', fontWeight: 900, opacity: 0.15, letterSpacing: '0.1em' }}>404</div>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 800, margin: '0 0 8px 0' }}>Không tìm thấy trang</h2>
            <p style={{ fontSize: '14px', color: '#a1a1aa', margin: 0, lineHeight: 1.5 }}>
              The page you are looking for does not exist or has been moved.
            </p>
          </div>
          <div style={{ marginTop: '16px' }}>
            <Link 
              href="/" 
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '10px 24px',
                borderRadius: '12px',
                backgroundColor: '#ffffff',
                color: '#09090b',
                textDecoration: 'none',
                fontWeight: 'bold',
                fontSize: '14px',
                border: '1px solid #e4e4e7',
                cursor: 'pointer'
              }}
            >
              Trở về trang chủ / Return Home
            </Link>
          </div>
        </div>
      </body>
    </html>
  )
}
