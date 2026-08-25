'use client'

import React, { useState } from 'react'
import { FileText, Download, RefreshCw, UploadCloud } from 'lucide-react'
import FormField from '@/components/molecules/FormField'
import { uploadCV } from '@/app/actions/portfolio'
import { useLanguage } from '@/context/LanguageContext'

interface AdminHeroTabProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
  editLang: 'vi' | 'en'
  pin: string
  setSaveStatus: React.Dispatch<React.SetStateAction<{ type: 'success' | 'error' | null; message: string }>>
  getFieldValue: (field: any, lang: 'vi' | 'en') => string
  updateFieldValue: (oldField: any, lang: 'vi' | 'en', newValue: string) => any
}

export default function AdminHeroTab({
  data,
  setData,
  editLang,
  pin,
  setSaveStatus,
  getFieldValue,
  updateFieldValue
}: AdminHeroTabProps) {
  const { t } = useLanguage()
  const [selectedCvRole, setSelectedCvRole] = useState<'frontend' | 'backend' | 'fullstack'>('frontend')
  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null)
  const [isUploadingCv, setIsUploadingCv] = useState(false)
  const [cvError, setCvError] = useState('')

  const handleCvFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCvError('')
    const file = e.target.files?.[0]
    if (!file) {
      setSelectedCvFile(null)
      return
    }

    const extMatch = file.name.match(/\.(pdf|doc|docx)$/i)
    if (!extMatch) {
      setCvError(t('admin.cv.invalidType'))
      setSelectedCvFile(null)
      return
    }

    setSelectedCvFile(file)
  }

  const handleUploadCv = async () => {
    if (!selectedCvFile) {
      setCvError(t('admin.cv.noFile'))
      return
    }

    setIsUploadingCv(true)
    setCvError('')

    const formData = new FormData()
    formData.append('file', selectedCvFile)

    const res = await uploadCV(pin, formData, selectedCvRole)
    if (res.success) {
      setData((prev: any) => ({
        ...prev,
        cvUrl: res.cvUrl,
        cvUrls: res.cvUrls || {
          ...prev?.cvUrls,
          [selectedCvRole]: res.cvUrl
        }
      }))
      setSaveStatus({ type: 'success', message: t('admin.cv.success') })
      setSelectedCvFile(null)
      setTimeout(() => setSaveStatus({ type: null, message: '' }), 5000)
    } else {
      setCvError(res.error || 'Lỗi khi thay thế file CV')
    }
    setIsUploadingCv(false)
  }

  const langSuffix = ` (${editLang.toUpperCase()})`

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
        {t('admin.hero.title')} {langSuffix}
      </h3>

      {/* CV FILE MANAGEMENT CARD */}
      <div className="p-6 rounded-2xl bg-theme-card border border-theme space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-theme-main" />
            <h4 className="text-base font-bold text-theme-main">
              {t('admin.cv.title')}
            </h4>
          </div>

          {/* Role Tabs */}
          <div className="flex items-center gap-1.5 bg-theme-card-subtle p-1 rounded-xl border border-theme">
            {(['frontend', 'backend', 'fullstack'] as const).map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => {
                  setSelectedCvRole(r)
                  setSelectedCvFile(null)
                  setCvError('')
                }}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                  selectedCvRole === r
                    ? 'bg-theme-accent shadow-sm'
                    : 'text-theme-muted hover:text-theme-main'
                }`}
              >
                {r === 'frontend' ? 'Front-End' : r === 'backend' ? 'Back-End' : 'Fullstack'}
              </button>
            ))}
          </div>
        </div>

        {/* Active Role CV Info */}
        <div className="flex items-center justify-between p-3 rounded-xl bg-theme-card-subtle border border-theme text-xs">
          <div>
            <span className="font-semibold text-theme-muted">
              {t('admin.cv.currentCv')} <strong className="text-theme-main uppercase">({selectedCvRole})</strong>:
            </span>
            <span className="ml-2 font-mono text-theme-main">
              {data?.cvUrls?.[selectedCvRole] || (selectedCvRole === 'frontend' ? data?.cvUrl : `/MyCV_${selectedCvRole}.pdf`)}
            </span>
          </div>
          {(data?.cvUrls?.[selectedCvRole] || data?.cvUrl) && (
            <a
              href={data?.cvUrls?.[selectedCvRole] || data?.cvUrl}
              target="_blank"
              rel="noopener noreferrer"
              download
              className="px-3 py-1 rounded-lg bg-theme-card border border-theme hover:bg-theme-accent font-bold transition-all flex items-center gap-1 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{t('admin.cv.viewCv')}</span>
            </a>
          )}
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
          <div className="flex-1 w-full space-y-1">
            <label className="text-xs font-semibold text-theme-muted block">
              {t('admin.cv.selectFile')} <span className="font-bold text-theme-main">[{selectedCvRole.toUpperCase()}]</span>
            </label>
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              onChange={handleCvFileChange}
              className="w-full text-xs text-theme-muted file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border file:border-theme file:text-xs file:font-semibold file:bg-theme-card-subtle file:text-theme-main hover:file:bg-theme-card cursor-pointer"
            />
          </div>

          <button
            type="button"
            onClick={handleUploadCv}
            disabled={isUploadingCv || !selectedCvFile}
            className="px-5 py-2.5 rounded-xl bg-theme-accent hover:opacity-90 disabled:opacity-50 font-bold text-xs shadow-md transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-end sm:self-auto"
          >
            {isUploadingCv ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <UploadCloud className="w-4 h-4" />
            )}
            <span>{isUploadingCv ? t('admin.cv.uploading') : `${t('admin.cv.uploadBtn')} (${selectedCvRole.toUpperCase()})`}</span>
          </button>
        </div>

        {cvError && (
          <div className="text-xs font-semibold text-red-500 bg-red-500/10 p-2.5 rounded-xl border border-red-500/20">
            {cvError}
          </div>
        )}
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          id="heroGreeting"
          label={`${t('admin.hero.greeting')}${langSuffix}`}
          value={getFieldValue(data.hero.greeting, editLang)}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, greeting: updateFieldValue(data.hero.greeting, editLang, val) } })}
        />

        <FormField
          id="heroName"
          label={`${t('admin.hero.name')}${langSuffix}`}
          value={getFieldValue(data.hero.name, editLang)}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, name: updateFieldValue(data.hero.name, editLang, val) } })}
        />
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <FormField
          id="heroRole"
          label={`${t('admin.hero.role')}${langSuffix}`}
          value={getFieldValue(data.hero.role, editLang)}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, role: updateFieldValue(data.hero.role, editLang, val) } })}
        />

        <FormField
          id="heroReady"
          label={`${t('admin.hero.ready')}${langSuffix}`}
          value={getFieldValue(data.hero.ready, editLang)}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, ready: updateFieldValue(data.hero.ready, editLang, val) } })}
        />
      </div>

      <FormField
        id="heroDesc"
        label={`${t('admin.hero.description')}${langSuffix}`}
        rows={4}
        value={getFieldValue(data.hero.description, editLang)}
        onChange={(val) => setData({ ...data, hero: { ...data.hero, description: updateFieldValue(data.hero.description, editLang, val) } })}
      />

      <div className="grid grid-cols-3 gap-6 pt-4 border-t border-slate-100 dark:border-slate-800">
        <FormField
          id="statYears"
          label={t('admin.hero.statsYears')}
          value={data.hero.statsYears || ''}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, statsYears: val } })}
        />
        <FormField
          id="statProjects"
          label={t('admin.hero.statsProjects')}
          value={data.hero.statsProjects || ''}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, statsProjects: val } })}
        />
        <FormField
          id="statClients"
          label={t('admin.hero.statsClients')}
          value={data.hero.statsClients || ''}
          onChange={(val) => setData({ ...data, hero: { ...data.hero, statsClients: val } })}
        />
      </div>
    </div>
  )
}
