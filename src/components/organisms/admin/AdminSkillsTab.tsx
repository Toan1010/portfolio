'use client'

import React from 'react'
import { useLanguage } from '@/context/LanguageContext'

interface AdminSkillsTabProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
}

export default function AdminSkillsTab({
  data,
  setData
}: AdminSkillsTabProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('admin.skills.title')}</h3>
      {['frontend', 'backend', 'devops'].map((category) => (
        <div key={category} className="space-y-2">
          <label className="text-sm font-semibold capitalize text-slate-700 dark:text-slate-300">
            {category} {t('admin.skills.stackHelp')}
          </label>
          <input
            type="text"
            value={Array.isArray(data.skills[category]) ? data.skills[category].join(', ') : ''}
            onChange={(e) => {
              const array = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
              setData({ ...data, skills: { ...data.skills, [category]: array } })
            }}
            className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
          />
        </div>
      ))}
    </div>
  )
}
