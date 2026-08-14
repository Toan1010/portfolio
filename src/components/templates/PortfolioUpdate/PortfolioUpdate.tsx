'use client'

import React from 'react'
import { RefreshCw, Globe, UserCheck, Layers, Code, FolderGit2, Mail, CheckCircle, AlertCircle } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { usePortfolioUpdate } from './usePortfolioUpdate'

import AdminUnlock from '@/components/organisms/admin/AdminUnlock'
import AdminHeader from '@/components/organisms/admin/AdminHeader'
import AdminHeroTab from '@/components/organisms/admin/AdminHeroTab'
import AdminAboutTab from '@/components/organisms/admin/AdminAboutTab'
import AdminSkillsTab from '@/components/organisms/admin/AdminSkillsTab'
import AdminProjectsTab from '@/components/organisms/admin/AdminProjectsTab'
import AdminContactTab from '@/components/organisms/admin/AdminContactTab'

export default function PortfolioUpdate() {
  const { t } = useLanguage()
  const [
    {
      pin,
      isUnlocked,
      authError,
      isVerifying,
      activeTab,
      editLang,
      data,
      isLoading,
      saveStatus
    },
    {
      setPin,
      setIsUnlocked,
      setActiveTab,
      setEditLang,
      setData,
      setSaveStatus,
      jsonFileInputRef,
      getFieldValue,
      updateFieldValue,
      handleExportJson,
      handleImportClick,
      handleJsonFileChange,
      handleUnlock,
      handleSave
    }
  ] = usePortfolioUpdate()

  if (!isUnlocked) {
    return (
      <AdminUnlock
        pin={pin}
        setPin={setPin}
        authError={authError}
        isVerifying={isVerifying}
        handleUnlock={handleUnlock}
      />
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
      <AdminHeader
        isLoading={isLoading}
        handleExportJson={handleExportJson}
        handleImportClick={handleImportClick}
        handleSave={handleSave}
        setIsUnlocked={setIsUnlocked}
      />

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
        {activeTab === 'hero' && (
          <AdminHeroTab
            data={data}
            setData={setData}
            editLang={editLang}
            pin={pin}
            setSaveStatus={setSaveStatus}
            getFieldValue={getFieldValue}
            updateFieldValue={updateFieldValue}
          />
        )}
        {activeTab === 'about' && (
          <AdminAboutTab
            data={data}
            setData={setData}
            editLang={editLang}
            getFieldValue={getFieldValue}
            updateFieldValue={updateFieldValue}
          />
        )}
        {activeTab === 'skills' && (
          <AdminSkillsTab
            data={data}
            setData={setData}
          />
        )}
        {activeTab === 'projects' && (
          <AdminProjectsTab
            data={data}
            setData={setData}
            editLang={editLang}
            getFieldValue={getFieldValue}
            updateFieldValue={updateFieldValue}
          />
        )}
        {activeTab === 'contact' && (
          <AdminContactTab
            data={data}
            setData={setData}
          />
        )}
      </div>
    </div>
  )
}
