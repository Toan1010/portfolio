'use client'

import React from 'react'
import { Plus, Trash2 } from 'lucide-react'
import FormField from '@/components/molecules/FormField'
import { useLanguage } from '@/context/LanguageContext'

interface AdminProjectsTabProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
  editLang: 'vi' | 'en'
  getFieldValue: (field: any, lang: 'vi' | 'en') => string
  updateFieldValue: (oldField: any, lang: 'vi' | 'en', newValue: string) => any
}

export default function AdminProjectsTab({
  data,
  setData,
  editLang,
  getFieldValue,
  updateFieldValue
}: AdminProjectsTabProps) {
  const { t } = useLanguage()
  const langSuffix = ` (${editLang.toUpperCase()})`

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-theme-main">
          {t('admin.projects.title')} ({data.projects.length}) {langSuffix}
        </h3>
        <button
          type="button"
          onClick={() => {
            const newProj = {
              id: Date.now(),
              title: { vi: 'Dự án mới', en: 'New Project' },
              category: 'Frontend',
              description: { vi: 'Mô tả dự án mới...', en: 'New project description...' },
              tags: ['React', 'Next.js'],
              image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=60',
              demoUrl: '#',
              githubUrl: '#'
            }
            setData({ ...data, projects: [...data.projects, newProj] })
          }}
          className="px-4 py-2 rounded-xl bg-theme-accent font-semibold text-xs flex items-center gap-1.5 cursor-pointer shadow-sm"
        >
          <Plus className="w-4 h-4" /> {t('admin.projects.addBtn')}
        </button>
      </div>

      <div className="space-y-6">
        {data.projects.map((proj: any, index: number) => (
          <div key={proj.id} className="p-6 rounded-2xl border border-theme bg-theme-card-subtle space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-bold text-theme-main">{t('admin.projects.projNum')}{index + 1}</span>
              <button
                type="button"
                onClick={() => {
                  setData({ ...data, projects: data.projects.filter((p: any) => p.id !== proj.id) })
                }}
                className="p-2 text-red-500 hover:bg-red-500/10 rounded-lg transition-colors cursor-pointer"
                title={t('admin.projects.deleteHelp')}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                id={`pTitle_${proj.id}`}
                label={`${t('admin.projects.projName')}${langSuffix}`}
                value={getFieldValue(proj.title, editLang)}
                onChange={(val) => {
                  const updated = [...data.projects]
                  updated[index].title = updateFieldValue(proj.title, editLang, val)
                  setData({ ...data, projects: updated })
                }}
              />
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-theme-main">{t('admin.projects.category')}</label>
                <select
                  value={proj.category}
                  onChange={(e) => {
                    const updated = [...data.projects]
                    updated[index].category = e.target.value
                    setData({ ...data, projects: updated })
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main focus:outline-none focus:border-theme-accent text-sm"
                >
                  <option value="Frontend">Frontend</option>
                  <option value="Backend">Backend</option>
                  <option value="Fullstack">Fullstack</option>
                </select>
              </div>
            </div>

            <FormField
              id={`pDesc_${proj.id}`}
              label={`${t('admin.projects.projDesc')}${langSuffix}`}
              rows={3}
              value={getFieldValue(proj.description, editLang)}
              onChange={(val) => {
                const updated = [...data.projects]
                updated[index].description = updateFieldValue(proj.description, editLang, val)
                setData({ ...data, projects: updated })
              }}
            />

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('admin.projects.tags')}</label>
              <input
                type="text"
                value={Array.isArray(proj.tags) ? proj.tags.join(', ') : ''}
                onChange={(e) => {
                  const updated = [...data.projects]
                  updated[index].tags = e.target.value.split(',').map((s) => s.trim()).filter(Boolean)
                  setData({ ...data, projects: updated })
                }}
                className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <FormField
                id={`pDemo_${proj.id}`}
                label={t('admin.projects.demoUrl')}
                value={proj.demoUrl || ''}
                onChange={(val) => {
                  const updated = [...data.projects]
                  updated[index].demoUrl = val
                  setData({ ...data, projects: updated })
                }}
              />
              <FormField
                id={`pGit_${proj.id}`}
                label={t('admin.projects.githubUrl')}
                value={proj.githubUrl || ''}
                onChange={(val) => {
                  const updated = [...data.projects]
                  updated[index].githubUrl = val
                  setData({ ...data, projects: updated })
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
