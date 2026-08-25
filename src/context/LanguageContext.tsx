'use client'

import React, { createContext, useContext } from 'react'
import { useLocale, useTranslations } from 'next-intl'
import { useRouter, usePathname } from '@/i18n/routing'

type Language = 'vi' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  toggleLanguage: () => void
  t: (keyPath: string, fallback?: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const locale = useLocale() as Language
  const router = useRouter()
  const pathname = usePathname()
  const tNextIntl = useTranslations()

  const setLanguage = (lang: Language) => {
    router.replace(pathname, { locale: lang })
  }

  const toggleLanguage = () => {
    const nextLang = locale === 'vi' ? 'en' : 'vi'
    router.replace(pathname, { locale: nextLang })
  }

  const t = (keyPath: string, fallback?: string): string => {
    try {
      if (tNextIntl.has(keyPath)) {
        return tNextIntl(keyPath)
      }
      return fallback || keyPath
    } catch {
      return fallback || keyPath
    }
  }

  return (
    <LanguageContext.Provider value={{ language: locale, setLanguage, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
