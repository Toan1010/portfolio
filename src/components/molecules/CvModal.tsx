'use client'

import React from 'react'
import { X, Code2, Server, Layers, Download, FileText } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface CvModalProps {
  isOpen: boolean
  onClose: () => void
  cvUrls?: {
    frontend?: string
    backend?: string
    fullstack?: string
  }
  defaultCvUrl?: string
}

export default function CvModal({ isOpen, onClose, cvUrls, defaultCvUrl }: CvModalProps) {
  const { t } = useLanguage()

  if (!isOpen) return null

  const feUrl = cvUrls?.frontend || defaultCvUrl || '/MyCV_frontend.pdf'
  const beUrl = cvUrls?.backend || defaultCvUrl || '/MyCV_backend.pdf'
  const fsUrl = cvUrls?.fullstack || defaultCvUrl || '/MyCV_fullstack.pdf'

  const roles = [
    {
      id: 'frontend',
      title: t('admin.cv.roleFrontend') + ' CV',
      desc: t('admin.cvModal.frontendCv'),
      url: feUrl,
      icon: <Code2 className="w-6 h-6 text-theme-main" />,
      badge: 'Front-End',
    },
    {
      id: 'backend',
      title: t('admin.cv.roleBackend') + ' CV',
      desc: t('admin.cvModal.backendCv'),
      url: beUrl,
      icon: <Server className="w-6 h-6 text-theme-main" />,
      badge: 'Back-End',
    },
    {
      id: 'fullstack',
      title: t('admin.cv.roleFullstack') + ' CV',
      desc: t('admin.cvModal.fullstackCv'),
      url: fsUrl,
      icon: <Layers className="w-6 h-6 text-theme-main" />,
      badge: 'Fullstack',
    }
  ]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg bg-theme-main border-2 border-theme rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-theme-main">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-theme pb-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-theme-card-subtle text-theme-main">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t('admin.cvModal.title')}</h3>
              <p className="text-xs opacity-80">{t('admin.cvModal.subtitle')}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-theme-card-subtle hover:opacity-80 transition-opacity cursor-pointer text-theme-main"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Roles List */}
        <div className="space-y-3">
          {roles.map((role) => (
            <a
              key={role.id}
              href={role.url}
              download
              onClick={onClose}
              className="flex items-center justify-between p-4 rounded-2xl bg-theme-card border border-theme hover:scale-[1.01] hover:shadow-md transition-all group"
            >
              <div className="flex items-center gap-3.5">
                <div className="p-3 rounded-xl bg-theme-card-subtle">
                  {role.icon}
                </div>
                <div className="text-left">
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-base">{role.title}</span>
                  </div>
                  <span className="text-xs opacity-75">{role.desc}</span>
                </div>
              </div>

              <div className="px-3.5 py-2 rounded-xl bg-theme-accent font-bold text-xs flex items-center gap-1.5 shadow-sm group-hover:scale-105 transition-transform">
                <Download className="w-3.5 h-3.5" />
                <span>{t('admin.cvModal.download')}</span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
