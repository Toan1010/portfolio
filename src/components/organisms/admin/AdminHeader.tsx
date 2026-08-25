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
    <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-8 mb-8 border-b border-theme">
      <div>
        <h1 className="text-3xl font-extrabold text-theme-main flex items-center gap-2.5">
          <Layers className="w-7 h-7 text-theme-main" /> {t('admin.editorTitle')}
        </h1>
        <p className="text-sm text-theme-muted mt-1">
          {t('admin.editorDesc')}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* Export JSON Button */}
        <button
          onClick={handleExportJson}
          className="px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main font-semibold text-sm hover:bg-theme-card transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Export portfolio-data.json"
        >
          <Download className="w-4 h-4 text-theme-main" />
          <span>{t('admin.exportBtn')}</span>
        </button>

        {/* Import JSON Button */}
        <button
          onClick={handleImportClick}
          className="px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main font-semibold text-sm hover:bg-theme-card transition-colors flex items-center gap-1.5 cursor-pointer"
          title="Import portfolio-data.json"
        >
          <Upload className="w-4 h-4 text-theme-main" />
          <span>{t('admin.importBtn')}</span>
        </button>

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={isLoading}
          className="px-6 py-3 rounded-xl bg-theme-accent font-bold shadow-sm transition-all flex items-center gap-2 cursor-pointer disabled:opacity-50"
        >
          {isLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          {t('admin.saveBtn')}
        </button>

        {/* Lock Button */}
        <button
          onClick={() => setIsUnlocked(false)}
          className="px-4 py-3 rounded-xl bg-theme-card-subtle border border-theme text-theme-main font-semibold text-sm hover:bg-theme-card transition-colors cursor-pointer"
        >
          {t('admin.lockBtn')}
        </button>
      </div>
    </div>
  )
}
