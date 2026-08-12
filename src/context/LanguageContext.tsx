'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { en } from '@/locales/en'
import { vi } from '@/locales/vi'

type Language = 'vi' | 'en'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (keyPath: string, fallback?: string) => string
}

const dictionaries = { en, vi }

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('vi')

  useEffect(() => {
    const saved = localStorage.getItem('portfolio_lang') as Language
    if (saved && (saved === 'en' || saved === 'vi')) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('portfolio_lang', lang)
  }

  const t = (keyPath: string, fallback?: string): string => {
    const keys = keyPath.split('.')
    let current: any = dictionaries[language]

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key]
      } else {
        return fallback || keyPath
      }
    }

    return typeof current === 'string' ? current : fallback || keyPath
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
