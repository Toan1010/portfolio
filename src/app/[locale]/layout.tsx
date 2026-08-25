import type { Metadata } from 'next'
import { ThemeProvider } from '@/context/ThemeContext'
import { LanguageProvider } from '@/context/LanguageContext'
import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import '../globals.css'

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

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-theme-main text-theme-main min-h-screen relative font-sans selection:bg-theme-card-subtle antialiased overflow-x-hidden transition-colors duration-300 flex flex-col">
        <NextIntlClientProvider messages={messages} locale={locale}>
          <ThemeProvider>
            <LanguageProvider>
              {/* Clean Ambient Subtlety */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0 opacity-40">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,var(--theme-border),transparent_70%)]" />
              </div>

              <Header />

              <main className="flex-grow flex flex-col relative z-10">
                {children}
              </main>

              <Footer />
            </LanguageProvider>
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
