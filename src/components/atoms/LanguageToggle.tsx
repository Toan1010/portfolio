'use client'

import { useLanguage } from '@/context/LanguageContext'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className = "px-3 py-1.5 rounded-xl text-xs font-semibold" }: LanguageToggleProps) {
  const { language, setLanguage } = useLanguage()

  const toggleLanguage = () => {
    setLanguage(language === 'vi' ? 'en' : 'vi')
  }

  return (
    <button
      onClick={toggleLanguage}
      className={`${className} bg-slate-100 hover:bg-slate-200 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 transition-colors cursor-pointer flex items-center gap-1.5`}
    >
      <Globe className="w-3.5 h-3.5 text-indigo-500" />
      <span>{language === 'vi' ? 'VIE' : 'ENG'}</span>
    </button>
  )
}
