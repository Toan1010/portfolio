'use client'

import React, { useState, useRef } from 'react'
import { Lock, Unlock, Save, CheckCircle, AlertCircle, RefreshCw, Layers, UserCheck, Code, FolderGit2, Mail, Plus, Trash2, Globe, FileText, UploadCloud, Download, Upload } from 'lucide-react'
import { verifyAdminPin, fetchPortfolioContent, updatePortfolioContent, uploadCV } from '@/app/actions/portfolio'
import FormField from '@/components/molecules/FormField'
import { useLanguage } from '@/context/LanguageContext'

export default function AdminPage() {
  const { t } = useLanguage()
  const [pin, setPin] = useState('')
  const [isUnlocked, setIsUnlocked] = useState(false)
  const [authError, setAuthError] = useState('')
  const [isVerifying, setIsVerifying] = useState(false)

  const [activeTab, setActiveTab] = useState<'hero' | 'about' | 'skills' | 'projects' | 'contact'>('hero')
  const [editLang, setEditLang] = useState<'vi' | 'en'>('vi')
  const [data, setData] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' })

  const [selectedCvFile, setSelectedCvFile] = useState<File | null>(null)
  const [isUploadingCv, setIsUploadingCv] = useState(false)
  const [cvError, setCvError] = useState('')

  const jsonFileInputRef = useRef<HTMLInputElement>(null)

  const getFieldValue = (field: any, lang: 'vi' | 'en') => {
    if (field === null || field === undefined) return ''
    if (typeof field === 'string') return field
    if (typeof field === 'object') {
      return field[lang] ?? field['vi'] ?? field['en'] ?? ''
    }
    return String(field)
  }

  const updateFieldValue = (oldField: any, lang: 'vi' | 'en', newValue: string) => {
    if (typeof oldField === 'object' && oldField !== null) {
      return { ...oldField, [lang]: newValue }
    }
    return lang === 'vi'
      ? { vi: newValue, en: typeof oldField === 'string' ? oldField : newValue }
      : { vi: typeof oldField === 'string' ? oldField : newValue, en: newValue }
  }

  const handleExportJson = () => {
    if (!data) return
    const jsonString = JSON.stringify(data, null, 2)
    const blob = new Blob([jsonString], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'portfolio-data.json'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const handleImportClick = () => {
    jsonFileInputRef.current?.click()
  }

  const handleJsonFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string)
        if (parsed && typeof parsed === 'object') {
          setData(parsed)
          setSaveStatus({ type: 'success', message: t('admin.importSuccess') })
          setTimeout(() => setSaveStatus({ type: null, message: '' }), 6000)
        } else {
          setSaveStatus({ type: 'error', message: t('admin.importInvalid') })
        }
      } catch (err) {
        setSaveStatus({ type: 'error', message: t('admin.importError') })
      }
    }
    reader.readAsText(file)
    e.target.value = ''
  }

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

    const res = await uploadCV(pin, formData)
    if (res.success) {
      setData((prev: any) => ({ ...prev, cvUrl: res.cvUrl }))
      setSaveStatus({ type: 'success', message: t('admin.cv.success') })
      setSelectedCvFile(null)
      setTimeout(() => setSaveStatus({ type: null, message: '' }), 5000)
    } else {
      setCvError(res.error || 'Lỗi khi thay thế file CV')
    }
    setIsUploadingCv(false)
  }

  const handleUnlock = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsVerifying(true)
    setAuthError('')

    const res = await verifyAdminPin(pin)
    if (res.success) {
      setIsUnlocked(true)
      loadData()
    } else {
      setAuthError(res.error || t('admin.invalidPin'))
    }
    setIsVerifying(false)
  }

  const loadData = async () => {
    setIsLoading(true)
    const content = await fetchPortfolioContent()
    setData(content)
    setIsLoading(false)
  }

  const handleSave = async () => {
    if (!data) return
    setIsLoading(true)
    setSaveStatus({ type: null, message: '' })

    const res = await updatePortfolioContent(pin, data)
    if (res.success) {
      setSaveStatus({ type: 'success', message: t('admin.saveSuccess') })
      setTimeout(() => setSaveStatus({ type: null, message: '' }), 6000)
    } else {
      setSaveStatus({ type: 'error', message: res.error || t('admin.saveError') })
    }
    setIsLoading(false)
  }

  if (!isUnlocked) {
    return (
      <div className="min-h-[calc(100vh-160px)] flex items-center justify-center px-6 py-16">
        <div className="w-full max-w-md p-8 rounded-3xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 shadow-2xl backdrop-blur-xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 text-indigo-500 flex items-center justify-center mx-auto border border-indigo-500/20">
            <Lock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-slate-900 dark:text-white">
              {t('admin.portalTitle')}
            </h1>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              {t('admin.pinInstruction')}
            </p>
          </div>

          <form onSubmit={handleUnlock} className="space-y-4 text-left">
            <FormField
              id="adminPin"
              label={t('admin.pinLabel')}
              type="password"
              required
              value={pin}
              onChange={setPin}
              placeholder={t('admin.pinPlaceholder')}
            />

            {authError && (
              <div className="flex items-center gap-2 text-xs font-semibold text-red-500 bg-red-500/10 p-3 rounded-xl border border-red-500/20">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 hover:from-indigo-600 hover:to-violet-600 text-white font-bold transition-all shadow-lg shadow-indigo-500/25 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
            >
              {isVerifying ? (
                <RefreshCw className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  <Unlock className="w-4 h-4" /> {t('admin.unlockBtn')}
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (!data || isLoading) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-3">
        <RefreshCw className="w-8 h-8 text-indigo-500 animate-spin" />
        <p className="text-sm font-semibold text-slate-400">{t('admin.loadingData')}</p>
      </div>
    )
  }

  const langSuffix = ` (${editLang.toUpperCase()})`

  return (
    <div className="max-w-7xl mx-auto py-12 px-6">
      {/* Hidden File Input for Importing JSON */}
      <input
        type="file"
        ref={jsonFileInputRef}
        onChange={handleJsonFileChange}
        accept=".json"
        className="hidden"
      />

      {/* Header */}
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

      {/* Alert Status Banner */}
      {saveStatus.type && (
        <div
          className={`mb-8 p-4 rounded-2xl flex items-center gap-3 text-sm font-semibold border ${
            saveStatus.type === 'success'
              ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20'
              : 'bg-red-500/10 text-red-600 dark:text-red-400 border-red-500/20'
          }`}
        >
          {saveStatus.type === 'success' ? <CheckCircle className="w-5 h-5 flex-shrink-0" /> : <AlertCircle className="w-5 h-5 flex-shrink-0" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Content Language Switcher Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl p-4 mb-8">
        <div className="flex items-center gap-2">
          <Globe className="w-5 h-5 text-indigo-500 flex-shrink-0" />
          <div>
            <span className="text-sm font-bold text-slate-900 dark:text-white block">
              {t('admin.editLangLabel')}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">
              {t('admin.editLangDesc')}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setEditLang('vi')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              editLang === 'vi'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('admin.langVi')}
          </button>
          <button
            type="button"
            onClick={() => setEditLang('en')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer ${
              editLang === 'en'
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/30'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {t('admin.langEn')}
          </button>
        </div>
      </div>

      {/* Tabs Bar */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-8 border-b border-slate-200 dark:border-slate-800/60">
        {[
          { id: 'hero', label: t('admin.tabs.hero'), icon: <UserCheck className="w-4 h-4" /> },
          { id: 'about', label: t('admin.tabs.about'), icon: <Layers className="w-4 h-4" /> },
          { id: 'skills', label: t('admin.tabs.skills'), icon: <Code className="w-4 h-4" /> },
          { id: 'projects', label: t('admin.tabs.projects'), icon: <FolderGit2 className="w-4 h-4" /> },
          { id: 'contact', label: t('admin.tabs.contact'), icon: <Mail className="w-4 h-4" /> }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`px-5 py-2.5 rounded-xl font-semibold text-sm flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-indigo-500 text-white shadow-md shadow-indigo-500/25'
                : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            {tab.icon}
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 rounded-2xl p-8 shadow-sm text-left">
        {/* HERO TAB */}
        {activeTab === 'hero' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {t('admin.hero.title')} {langSuffix}
            </h3>

            {/* CV FILE MANAGEMENT CARD */}
            <div className="p-6 rounded-2xl bg-indigo-500/5 border border-indigo-500/20 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-indigo-500" />
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    {t('admin.cv.title')}
                  </h4>
                </div>
                {data.cvUrl && (
                  <a
                    href={data.cvUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    download
                    className="px-3.5 py-1.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white text-xs font-bold transition-all flex items-center gap-1.5"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>{t('admin.cv.viewCv')}</span>
                  </a>
                )}
              </div>

              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pt-2">
                <div className="flex-1 w-full space-y-1">
                  <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block">
                    {t('admin.cv.selectFile')}
                  </label>
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleCvFileChange}
                    className="w-full text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-500/10 file:text-indigo-600 dark:file:text-indigo-400 hover:file:bg-indigo-500/20 cursor-pointer"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleUploadCv}
                  disabled={isUploadingCv || !selectedCvFile}
                  className="px-5 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-600 disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5 cursor-pointer whitespace-nowrap self-end sm:self-auto"
                >
                  {isUploadingCv ? (
                    <RefreshCw className="w-4 h-4 animate-spin" />
                  ) : (
                    <UploadCloud className="w-4 h-4" />
                  )}
                  <span>{isUploadingCv ? t('admin.cv.uploading') : t('admin.cv.uploadBtn')}</span>
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
        )}

        {/* ABOUT TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              {t('admin.about.title')} {langSuffix}
            </h3>
            <FormField
              id="aboutTitle"
              label={`${t('admin.about.aboutTitle')}${langSuffix}`}
              value={getFieldValue(data.about.title, editLang)}
              onChange={(val) => setData({ ...data, about: { ...data.about, title: updateFieldValue(data.about.title, editLang, val) } })}
            />
            <FormField
              id="aboutSubtitle"
              label={`${t('admin.about.aboutSubtitle')}${langSuffix}`}
              value={getFieldValue(data.about.subtitle, editLang)}
              onChange={(val) => setData({ ...data, about: { ...data.about, subtitle: updateFieldValue(data.about.subtitle, editLang, val) } })}
            />
            <FormField
              id="aboutNarrativeTitle"
              label={`${t('admin.about.narrativeTitle')}${langSuffix}`}
              value={getFieldValue(data.about.narrativeTitle, editLang)}
              onChange={(val) => setData({ ...data, about: { ...data.about, narrativeTitle: updateFieldValue(data.about.narrativeTitle, editLang, val) } })}
            />
            <FormField
              id="aboutP1"
              label={`${t('admin.about.narrativeP1')}${langSuffix}`}
              rows={4}
              value={getFieldValue(data.about.narrativeP1, editLang)}
              onChange={(val) => setData({ ...data, about: { ...data.about, narrativeP1: updateFieldValue(data.about.narrativeP1, editLang, val) } })}
            />
            <FormField
              id="aboutP2"
              label={`${t('admin.about.narrativeP2')}${langSuffix}`}
              rows={4}
              value={getFieldValue(data.about.narrativeP2, editLang)}
              onChange={(val) => setData({ ...data, about: { ...data.about, narrativeP2: updateFieldValue(data.about.narrativeP2, editLang, val) } })}
            />
          </div>
        )}

        {/* SKILLS TAB */}
        {activeTab === 'skills' && (
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
        )}

        {/* PROJECTS TAB */}
        {activeTab === 'projects' && (
          <div className="space-y-8">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">
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
                className="px-4 py-2 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-white font-semibold text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="w-4 h-4" /> {t('admin.projects.addBtn')}
              </button>
            </div>

            <div className="space-y-6">
              {data.projects.map((proj: any, index: number) => (
                <div key={proj.id} className="p-6 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/30 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-indigo-500">{t('admin.projects.projNum')}{index + 1}</span>
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
                      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">{t('admin.projects.category')}</label>
                      <select
                        value={proj.category}
                        onChange={(e) => {
                          const updated = [...data.projects]
                          updated[index].category = e.target.value
                          setData({ ...data, projects: updated })
                        }}
                        className="w-full px-4 py-3 rounded-xl bg-slate-100 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white"
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
        )}

        {/* CONTACT TAB */}
        {activeTab === 'contact' && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-4">{t('admin.contact.title')}</h3>
            <FormField
              id="contactEmail"
              label={t('admin.contact.email')}
              value={data.contact?.email || ''}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, email: val } })}
            />
            <FormField
              id="contactGithub"
              label={t('admin.contact.github')}
              value={data.contact?.github || ''}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, github: val } })}
            />
            <FormField
              id="contactLinkedin"
              label={t('admin.contact.linkedin')}
              value={data.contact?.linkedin || ''}
              onChange={(val) => setData({ ...data, contact: { ...data.contact, linkedin: val } })}
            />
          </div>
        )}
      </div>
    </div>
  )
}
