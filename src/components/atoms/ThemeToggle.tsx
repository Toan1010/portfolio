'use client'

import { useState, useEffect } from 'react'
import { useTheme } from '@/context/ThemeContext'
import { Sun, Moon } from 'lucide-react'

interface ThemeToggleProps {
  className?: string
}

export default function ThemeToggle({ className = "p-2 rounded-xl" }: ThemeToggleProps) {
  const { theme, toggleTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    toggleTheme()
  }

  if (!mounted) {
    return (
      <button
        type="button"
        className={`${className} bg-theme-card-subtle border border-theme text-theme-main opacity-70 flex items-center justify-center`}
      >
        <Moon className="w-4 h-4 text-theme-main" />
      </button>
    )
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      aria-label="Toggle theme"
      className={`${className} bg-theme-card-subtle border border-theme text-theme-main hover:opacity-80 transition-opacity cursor-pointer flex items-center justify-center`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-theme-main" />
      ) : (
        <Moon className="w-4 h-4 text-theme-main" />
      )}
    </button>
  )
}
