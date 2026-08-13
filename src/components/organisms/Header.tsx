'use client'

import { useState, useEffect } from 'react'
import { ArrowUpRight, Menu, X, FileText } from 'lucide-react'
import Logo from '@/components/atoms/Logo'
import NavLinks from '@/components/molecules/NavLinks'
import LanguageToggle from '@/components/atoms/LanguageToggle'
import ThemeToggle from '@/components/atoms/ThemeToggle'
import CvModal from '@/components/molecules/CvModal'
import { useLanguage } from '@/context/LanguageContext'
import { fetchPortfolioContent } from '@/app/actions/portfolio'

export default function Header() {
  const { t } = useLanguage()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)
  const [portfolioData, setPortfolioData] = useState<any>(null)

  useEffect(() => {
    fetchPortfolioContent().then((res) => {
      if (res) setPortfolioData(res)
    })
  }, [])

  return (
    <>
      <header className="sticky top-0 z-40 backdrop-blur-md bg-theme-header border-b border-theme transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Logo />

          {/* Desktop Nav Links */}
          <NavLinks className="hidden md:flex items-center gap-8 text-theme-main" />

          {/* CTA, Language & Theme Toggle Button */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <ThemeToggle />

            <button 
              onClick={() => setIsCvModalOpen(true)}
              className="px-5 py-2.5 rounded-xl text-sm font-bold bg-theme-accent hover:opacity-90 transition-all duration-300 flex items-center gap-1.5 cursor-pointer shadow-sm"
            >
              <FileText className="w-4 h-4" />
              {t('header.hireMe')} <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile elements */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageToggle className="px-2.5 py-1 rounded-lg text-xs" />
            <ThemeToggle className="p-2 rounded-lg" />

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="p-2 rounded-lg text-theme-main bg-theme-card-subtle transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-theme-main backdrop-blur-lg border-b border-theme px-6 py-8 flex flex-col gap-6 shadow-xl">
            <NavLinks 
              className="flex flex-col gap-6 text-theme-main" 
              onItemClick={() => setMobileMenuOpen(false)} 
            />
            <button 
              onClick={() => {
                setMobileMenuOpen(false)
                setIsCvModalOpen(true)
              }}
              className="w-full text-center py-3 rounded-xl bg-theme-accent font-bold shadow-md flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4" />
              {t('header.hireMe')}
            </button>
          </div>
        )}
      </header>

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        cvUrls={portfolioData?.cvUrls}
        defaultCvUrl={portfolioData?.cvUrl}
      />
    </>
  )
}
