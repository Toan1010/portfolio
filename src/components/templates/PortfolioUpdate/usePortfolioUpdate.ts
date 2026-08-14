'use client'

import React, { useState, useRef } from 'react'
import { verifyAdminPin, fetchPortfolioContent, updatePortfolioContent } from '@/app/actions/portfolio'
import { useLanguage } from '@/context/LanguageContext'

export function usePortfolioUpdate() {
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

  return [
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
      setAuthError,
      setIsVerifying,
      setActiveTab,
      setEditLang,
      setData,
      setIsLoading,
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
  ] as const
}
