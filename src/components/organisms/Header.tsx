'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import NavLinks from '@/components/molecules/NavLinks'
import LanguageToggle from '@/components/atoms/LanguageToggle'
import ThemeToggle from '@/components/atoms/ThemeToggle'
import { useLanguage } from '@/context/LanguageContext'
import { fetchPortfolioContent } from '@/app/actions/portfolio'

export default function Header() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [cvUrl, setCvUrl] = useState('/MyCV.pdf')

  useEffect(() => {
    fetchPortfolioContent().then((res) => {
      if (res?.cvUrl) setCvUrl(res.cvUrl)
    })
  }, [])

  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-[#0b0f19]/80 border-b border-slate-200/50 dark:border-slate-800/50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <Logo />

        {/* Desktop Nav Links */}
        <NavLinks className="hidden md:flex items-center gap-8" />

        {/* CTA, Language & Theme Toggle Button */}
        <div className="hidden md:flex items-center gap-4">
          <LanguageToggle />
          <ThemeToggle />

          <a 
            href={cvUrl}
            download
            className="px-5 py-2.5 rounded-xl text-sm font-semibold bg-slate-900/5 dark:bg-white/5 border border-slate-200 dark:border-slate-700/80 text-slate-800 dark:text-white hover:bg-slate-900/10 dark:hover:bg-white/10 hover:border-slate-300 dark:hover:border-slate-600 transition-all duration-300 flex items-center gap-1.5"
          >
            {t('header.hireMe')} <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

        {/* Mobile elements */}
        <div className="flex items-center gap-2 md:hidden">
          <LanguageToggle className="px-2.5 py-1 rounded-lg text-xs" />
          <ThemeToggle className="p-2 rounded-lg" />

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/50 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-white/95 dark:bg-[#0b0f19]/95 backdrop-blur-lg border-b border-slate-200 dark:border-slate-800 px-6 py-8 flex flex-col gap-6 shadow-xl">
          <NavLinks 
            className="flex flex-col gap-6" 
            onItemClick={() => setMobileMenuOpen(false)} 
          />
          <a 
            href={cvUrl}
            download
            onClick={() => setMobileMenuOpen(false)}
            className="w-full text-center py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-semibold shadow-lg shadow-indigo-500/20"
          >
            {t('header.hireMe')}
          </a>
        </div>
      )}
    </header>
  )
}
