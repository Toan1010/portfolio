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
          className="text-sm font-bold transition-opacity duration-200 text-theme-main hover:opacity-70"
        >
          {link.name}
        </Link>
      ))}
    </nav>
  )
}
