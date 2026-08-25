'use client'

import React from 'react'
import FormField from '@/components/molecules/FormField'
import { useLanguage } from '@/context/LanguageContext'

interface AdminContactTabProps {
  data: any
  setData: React.Dispatch<React.SetStateAction<any>>
}

export default function AdminContactTab({
  data,
  setData
}: AdminContactTabProps) {
  const { t } = useLanguage()

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-theme-main mb-4">{t('admin.contact.title')}</h3>
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
  )
}
