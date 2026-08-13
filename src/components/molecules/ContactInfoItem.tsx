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
      className={`p-4 rounded-2xl bg-theme-card border border-theme hover:scale-[1.01] transition-all duration-300 flex items-center gap-4 group ${
        isSmall ? 'flex-1' : 'w-full'
      }`}
    >
      <div className="p-3 rounded-xl bg-theme-accent group-hover:opacity-90 transition-opacity">
        {icon}
      </div>
      <div className="flex flex-col text-left overflow-hidden text-theme-main">
        <span className="text-xs font-bold opacity-75 uppercase tracking-wider">
          {title}
        </span>
        <span className="text-sm font-extrabold truncate">
          {detail}
        </span>
      </div>
    </a>
  )
}
