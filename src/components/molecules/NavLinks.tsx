'use client'

import Link from 'next/link'
import { useLanguage } from '@/context/LanguageContext'

interface NavLinksProps {
  className?: string
  onItemClick?: () => void
}

export default function NavLinks({ className, onItemClick }: NavLinksProps) {
  const { t } = useLanguage()

  const links = [
    { name: t('header.home'), href: '/#home' },
    { name: t('header.about'), href: '/#about' },
    { name: t('header.skills'), href: '/#skills' },
    { name: t('header.projects'), href: '/#projects' },
    { name: t('header.contact'), href: '/#contact' }
  ]

  return (
    <nav className={className}>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          onClick={onItemClick}
          className="text-sm font-semibold transition-colors duration-200 text-slate-600 dark:text-slate-300 hover:text-indigo-600 dark:hover:text-white"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
