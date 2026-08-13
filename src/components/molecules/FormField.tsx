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
          className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme text-theme-main placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all resize-none font-medium"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-theme-card border border-theme text-theme-main placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all font-medium"
        />
      )}
    </div>
  )
}
