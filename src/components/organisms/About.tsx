'use client'

import { Award, CheckCircle, Code, Server, Database, Cpu } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'
import { getBilingualText } from '@/lib/i18n-helpers'

interface AboutProps {
  data?: any
}

export default function About({ data }: AboutProps) {
  const { t, language } = useLanguage()

  const title = getBilingualText(data?.title, language) || t('about.title')
  const subtitle = getBilingualText(data?.subtitle, language) || t('about.subtitle')
  const narrativeTitle = getBilingualText(data?.narrativeTitle, language) || t('about.narrativeTitle')
  const narrativeP1 = getBilingualText(data?.narrativeP1, language) || t('about.narrativeP1')
  const narrativeP2 = getBilingualText(data?.narrativeP2, language) || t('about.narrativeP2')

  return (
    <section id="about" className="py-24 px-6 border-t border-theme bg-theme-card-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">{title}</h2>
          <div className="h-1 w-20 bg-theme-accent mx-auto rounded-full" />
          <p className="opacity-80 text-theme-main">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-theme-main flex items-center gap-2">
              <Award className="text-emerald-500" /> {narrativeTitle}
            </h3>
            <p className="opacity-85 leading-relaxed text-theme-main">
              {narrativeP1}
            </p>
            <p className="opacity-85 leading-relaxed text-theme-main">
              {narrativeP2}
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-theme-card-subtle text-theme-main mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-theme-main">{t('about.valueQualityTitle')}</h4>
                  <p className="text-xs opacity-75 text-theme-main mt-0.5">{t('about.valueQualityDesc')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-theme-card-subtle text-theme-main mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-bold text-theme-main">{t('about.valuePerformanceTitle')}</h4>
                  <p className="text-xs opacity-75 text-theme-main mt-0.5">{t('about.valuePerformanceDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual highlights */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-theme-card border border-theme hover:scale-[1.02] transition-transform text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-theme-accent flex items-center justify-center font-bold">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-theme-main">{t('about.highlightFrontendTitle')}</h4>
              <p className="text-sm opacity-80 text-theme-main">{t('about.highlightFrontendDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-theme-card border border-theme hover:scale-[1.02] transition-transform text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-theme-accent flex items-center justify-center font-bold">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-theme-main">{t('about.highlightBackendTitle')}</h4>
              <p className="text-sm opacity-80 text-theme-main">{t('about.highlightBackendDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-theme-card border border-theme hover:scale-[1.02] transition-transform text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-theme-accent flex items-center justify-center font-bold">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-theme-main">{t('about.highlightDatabaseTitle')}</h4>
              <p className="text-sm opacity-80 text-theme-main">{t('about.highlightDatabaseDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-theme-card border border-theme hover:scale-[1.02] transition-transform text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-theme-accent flex items-center justify-center font-bold">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-theme-main">{t('about.highlightSystemTitle')}</h4>
              <p className="text-sm opacity-80 text-theme-main">{t('about.highlightSystemDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
