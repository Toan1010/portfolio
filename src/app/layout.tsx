import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'

export const metadata: Metadata = {
  title: 'Nguyễn Đức Toàn - Front End Developer | SSR Portfolio',
  description: 'Portfolio of Nguyen Duc Toan, Front End Developer specializing in React, Next.js, TypeScript, Server-Side Rendering (SSR), and Web Performance Optimization.',
  keywords: ['Nguyen Duc Toan', 'Front End Developer', 'React Developer', 'Next.js', 'TypeScript', 'SSR', 'Web Development', 'Portfolio'],
  authors: [{ name: 'Nguyễn Đức Toàn' }],
  openGraph: {
    title: 'Nguyễn Đức Toàn - Front End Developer Portfolio',
    description: 'Front End Developer specializing in React, Next.js, SSR, and modern caching strategies.',
    type: 'website',
    url: 'https://portfolio.toan.dev',
    siteName: 'Nguyen Duc Toan Portfolio',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="vi" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-theme-main text-theme-main min-h-screen relative font-sans selection:bg-theme-card-subtle antialiased overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {/* Background Decorative Glows */}
            <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] max-w-[800px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] max-w-[700px] bg-amber-500/10 rounded-full blur-[160px] pointer-events-none" />

            <Header />

            <main className="relative z-10">
              {children}
            </main>

            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
