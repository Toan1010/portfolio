'use client'

import React from 'react'

interface ContactInfoItemProps {
  href: string
  icon: React.ReactNode
  title: string
  detail: string
  isSmall?: boolean
}

export default function ContactInfoItem({
  href,
  icon,
  title,
  detail,
  isSmall = false
}: ContactInfoItemProps) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      className={`p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/40 hover:scale-[1.01] transition-all duration-300 flex items-center gap-4 group ${
        isSmall ? 'flex-1' : 'w-full'
      }`}
    >
      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
        {icon}
      </div>
      <div className="flex flex-col text-left overflow-hidden">
        <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-sm font-bold text-slate-800 dark:text-slate-200 truncate">
          {detail}
        </span>
      </div>
    </a>
  )
}
