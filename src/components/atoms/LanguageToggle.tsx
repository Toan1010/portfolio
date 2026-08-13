'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/context/LanguageContext'
import { Globe } from 'lucide-react'

interface LanguageToggleProps {
  className?: string
}

export default function LanguageToggle({ className = "px-3 py-1.5 rounded-xl text-xs font-semibold" }: LanguageToggleProps) {
  const { language, toggleLanguage } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleLanguage()
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className={`${className} bg-theme-card-subtle border border-theme text-theme-main opacity-70 flex items-center gap-1.5`}
      >
        <Globe className="w-3.5 h-3.5 text-theme-main" />
        <span>VIE</span>
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={`${className} bg-theme-card-subtle border border-theme text-theme-main hover:opacity-80 transition-opacity cursor-pointer flex items-center gap-1.5`}
    >
      <Globe className="w-3.5 h-3.5 text-theme-main" />
      <span>{language === 'vi' ? 'VIE' : 'ENG'}</span>
    </button>
  )
}
