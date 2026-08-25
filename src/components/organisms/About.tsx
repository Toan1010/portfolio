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
    <section id="about" className="py-20 px-6 border-t border-theme bg-theme-card-subtle">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">{title}</h2>
          <div className="h-1 w-12 bg-theme-accent mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-theme-muted">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-10 items-center">
          {/* Left Column: Narrative */}
          <div className="space-y-5 text-left">
            <h3 className="text-2xl font-bold text-theme-main flex items-center gap-2.5">
              <Award className="w-6 h-6 text-theme-main" /> {narrativeTitle}
            </h3>
            <p className="text-theme-muted leading-relaxed text-sm sm:text-base">
              {narrativeP1}
            </p>
            <p className="text-theme-muted leading-relaxed text-sm sm:text-base">
              {narrativeP2}
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="flex gap-3 items-start p-3 rounded-xl border border-theme bg-theme-card">
                <div className="p-2 rounded-lg bg-theme-card-subtle text-theme-main mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-theme-main">{t('about.valueQualityTitle')}</h4>
                  <p className="text-xs text-theme-muted mt-0.5">{t('about.valueQualityDesc')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start p-3 rounded-xl border border-theme bg-theme-card">
                <div className="p-2 rounded-lg bg-theme-card-subtle text-theme-main mt-0.5">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-semibold text-sm text-theme-main">{t('about.valuePerformanceTitle')}</h4>
                  <p className="text-xs text-theme-muted mt-0.5">{t('about.valuePerformanceDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual highlights */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-5 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/40 transition-colors text-left space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-theme-card-subtle text-theme-main border border-theme flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-theme-main">{t('about.highlightFrontendTitle')}</h4>
              <p className="text-xs text-theme-muted leading-relaxed">{t('about.highlightFrontendDesc')}</p>
            </div>

            <div className="p-5 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/40 transition-colors text-left space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-theme-card-subtle text-theme-main border border-theme flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-theme-main">{t('about.highlightBackendTitle')}</h4>
              <p className="text-xs text-theme-muted leading-relaxed">{t('about.highlightBackendDesc')}</p>
            </div>

            <div className="p-5 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/40 transition-colors text-left space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-theme-card-subtle text-theme-main border border-theme flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-theme-main">{t('about.highlightDatabaseTitle')}</h4>
              <p className="text-xs text-theme-muted leading-relaxed">{t('about.highlightDatabaseDesc')}</p>
            </div>

            <div className="p-5 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/40 transition-colors text-left space-y-2.5">
              <div className="w-10 h-10 rounded-lg bg-theme-card-subtle text-theme-main border border-theme flex items-center justify-center font-bold">
                <Cpu className="w-5 h-5" />
              </div>
              <h4 className="font-bold text-base text-theme-main">{t('about.highlightSystemTitle')}</h4>
              <p className="text-xs text-theme-muted leading-relaxed">{t('about.highlightSystemDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
