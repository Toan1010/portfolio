'use client'

import React from 'react'
import { Layers, Download, Upload, Save, RefreshCw } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface AdminHeaderProps {
  isLoading: boolean
  handleExportJson: () => void
  handleImportClick: () => void
  handleSave: () => void
  setIsUnlocked: (val: boolean) => void
}

export default function AdminHeader({
  isLoading,
  handleExportJson,
  handleImportClick,
  handleSave,
  setIsUnlocked
}: AdminHeaderProps) {
  const { t } = useLanguage()

  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-slate-200 dark:border-slate-800">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
          <Layers className="text-indigo-500" /> {t('admin.editorTitle')}
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
          {t('admin.editorDesc')}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Export JSON Button */}
        <button
          onClick={handleExportJson}
          className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Export portfolio-data.json"
        >
          <Download className="w-4 h-4 text-indigo-500" />
          <span>{t('admin.exportBtn')}</span>
        </button>

        {/* Import JSON Button */}
        <button
          onClick={handleImportClick}
          className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-sm transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Import portfolio-data.json"
        >
          <Upload className="w-4 h-4 text-violet-500" />
          <span>{t('admin.importBtn')}</span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {t('admin.saveBtn')}
        </button>

        {/* Lock Button */}
        <button
          onClick={() => setIsUnlocked(false)}
          className="px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-white/10 transition-colors"
        >
          {t('admin.lockBtn')}
        </button>
      </div>
    </div>
  )
}
