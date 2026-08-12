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
    <section id="about" className="py-24 px-6 border-t border-slate-200 dark:border-slate-900 bg-slate-100/50 dark:bg-[#090d16]/50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{title}</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400">{subtitle}</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Column: Narrative */}
          <div className="space-y-6 text-left">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Award className="text-indigo-600 dark:text-indigo-400" /> {narrativeTitle}
            </h3>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {narrativeP1}
            </p>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              {narrativeP2}
            </p>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{t('about.valueQualityTitle')}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t('about.valueQualityDesc')}</p>
                </div>
              </div>
              <div className="flex gap-3 items-start">
                <div className="p-2 rounded-lg bg-violet-500/10 text-violet-600 dark:text-violet-400 mt-1">
                  <CheckCircle className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="font-semibold text-slate-900 dark:text-white">{t('about.valuePerformanceTitle')}</h4>
                  <p className="text-xs text-slate-500 mt-0.5">{t('about.valuePerformanceDesc')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Visual highlights */}
          <div className="grid grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-600 flex items-center justify-center text-white">
                <Code className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t('about.highlightFrontendTitle')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('about.highlightFrontendDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-violet-500 to-violet-600 flex items-center justify-center text-white">
                <Server className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t('about.highlightBackendTitle')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('about.highlightBackendDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-blue-500 to-blue-600 flex items-center justify-center text-white">
                <Database className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t('about.highlightDatabaseTitle')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('about.highlightDatabaseDesc')}</p>
            </div>

            <div className="p-6 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-slate-300 dark:hover:border-slate-700 transition-colors text-left space-y-2">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-pink-500 to-pink-600 flex items-center justify-center text-white">
                <Cpu className="w-6 h-6" />
              </div>
              <h4 className="font-bold text-lg text-slate-900 dark:text-white">{t('about.highlightSystemTitle')}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">{t('about.highlightSystemDesc')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
