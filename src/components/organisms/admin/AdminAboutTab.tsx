'use client'

import React from 'react'
import FormField from '@/components/molecules/FormField'
import { useLanguage } from '@/context/LanguageContext'

interface AdminAboutTabProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
  editLang: 'vi' | 'en'
  getFieldValue: (field: any, lang: 'vi' | 'en') => string
  updateFieldValue: (oldField: any, lang: 'vi' | 'en', newValue: string) => any
}

export default function AdminAboutTab({
  data,
  setData,
  editLang,
  getFieldValue,
  updateFieldValue
}: AdminAboutTabProps) {
  const { t } = useLanguage()
  const langSuffix = ` (${editLang.toUpperCase()})`

  return (
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
  )
}
