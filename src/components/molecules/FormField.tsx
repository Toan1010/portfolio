'use client'

import React from 'react'

interface FormFieldProps {
  id: string
  label: string
  type?: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export default function FormField({
  id,
  label,
  type = 'text',
  required = false,
  value,
  onChange,
  placeholder,
  rows
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-bold text-theme-main">
        {label} {required && <span className="text-red-500">*</span>}
      </label>

      {rows ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main placeholder:text-theme-muted placeholder:opacity-60 focus:outline-none focus:border-theme-accent transition-colors resize-none text-sm font-medium"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main placeholder:text-theme-muted placeholder:opacity-60 focus:outline-none focus:border-theme-accent transition-colors text-sm font-medium"
        />
      )}
    </div>
  )
}
