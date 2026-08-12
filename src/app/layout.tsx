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
      <body className="bg-slate-50 dark:bg-[#0b0f19] text-slate-800 dark:text-slate-100 min-h-screen relative font-sans selection:bg-indigo-500/30 selection:text-indigo-200 antialiased overflow-x-hidden transition-colors duration-300">
        <ThemeProvider>
          <LanguageProvider>
            {/* Background Decorative Glows */}
            <div className="absolute top-[-10%] left-[-15%] w-[60vw] h-[60vw] max-w-[800px] bg-indigo-600/5 dark:bg-indigo-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute bottom-[20%] right-[-15%] w-[60vw] h-[60vw] max-w-[800px] bg-violet-600/5 dark:bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />
            <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[50vw] h-[50vw] max-w-[700px] bg-blue-600/3 dark:bg-blue-600/5 rounded-full blur-[160px] pointer-events-none" />

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
