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
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label} {required && <span className="text-pink-500">*</span>}
      </label>

      {rows ? (
        <textarea
          id={id}
          rows={rows}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors resize-none"
        />
      ) : (
        <input
          id={id}
          type={type}
          required={required}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-indigo-500 transition-colors"
        />
      )}
    </div>
  )
}
