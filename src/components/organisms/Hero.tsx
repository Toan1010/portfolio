'use client'

import { useState } from 'react'
import { Sparkles, ArrowUpRight, Terminal, FileText } from 'lucide-react'
import StatItem from '@/components/molecules/StatItem'
import CvModal from '@/components/molecules/CvModal'
import { getBilingualText } from '@/lib/i18n-helpers'
import { useLanguage } from '@/context/LanguageContext'

interface HeroProps {
  data?: any
}

export default function Hero({ data }: HeroProps) {
  const { t, language } = useLanguage()
  const [isCvModalOpen, setIsCvModalOpen] = useState(false)

  const ready = getBilingualText(data?.ready, language) || t('hero.ready')
  const name = getBilingualText(data?.name, language) || t('hero.name')
  const role = getBilingualText(data?.role, language) || t('hero.role')
  const description = getBilingualText(data?.description, language) || t('hero.description')
  const statsYears = getBilingualText(data?.statsYears, language) || '3+'
  const statsProjects = getBilingualText(data?.statsProjects, language) || '20+'
  const statsClients = getBilingualText(data?.statsClients, language) || '10+'

  return (
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center pt-8 pb-16 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center w-full">
        {/* Left Hero Text */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-card border border-theme text-theme-main w-fit text-xs font-semibold tracking-wide">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>{ready}</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.1] text-theme-main">
              {t('hero.greeting')} <br />
              <span className="opacity-90">
                {name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-semibold text-theme-muted">
              {role}
            </h2>
            <p className="text-base sm:text-lg text-theme-muted max-w-xl leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-3 pt-2">
            <button 
              onClick={() => setIsCvModalOpen(true)}
              className="px-6 py-3 rounded-xl bg-theme-accent font-semibold hover:opacity-90 transition-all duration-200 flex items-center gap-2 cursor-pointer shadow-sm text-sm"
            >
              <FileText className="w-4 h-4" />
              {t('hero.viewProjects')} <ArrowUpRight className="w-4 h-4" />
            </button>
            <a 
              href="#contact" 
              className="px-6 py-3 rounded-xl bg-theme-card border border-theme text-theme-main font-semibold hover:bg-theme-card-subtle transition-all duration-200 flex items-center gap-2 text-sm"
            >
              {t('hero.contactNow')}
            </a>
          </div>

          {/* Micro stats / Tech logs */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-theme max-w-md">
            <StatItem value={statsYears} label={t('hero.statsYears')} />
            <StatItem value={statsProjects} label={t('hero.statsProjects')} />
            <StatItem value={statsClients} label={t('hero.statsClients')} />
          </div>
        </div>

        {/* Right Hero Image/Animation */}
        <div className="md:col-span-5 flex justify-center relative">
          <div className="relative w-full max-w-md rounded-2xl bg-theme-card border border-theme p-5 shadow-lg">
            <div className="w-full bg-theme-main rounded-xl overflow-hidden flex flex-col p-5 relative border border-theme">
              {/* Simulated IDE header */}
              <div className="flex items-center justify-between pb-3.5 border-b border-theme">
                <div className="flex items-center gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-theme-muted opacity-40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-theme-muted opacity-40" />
                  <div className="w-2.5 h-2.5 rounded-full bg-theme-muted opacity-40" />
                </div>
                <span className="text-xs text-theme-muted font-mono">portfolio-ssr.tsx</span>
              </div>

              {/* Simulated IDE code lines */}
              <div className="flex-1 font-mono text-xs text-left pt-4 space-y-2 overflow-hidden text-theme-main leading-relaxed">
                <p className="text-theme-muted">import <span className="text-theme-main font-semibold">{"{"} NextPage {"}"}</span> from <span className="text-theme-muted">'next'</span></p>
                <p className="font-semibold text-theme-main">const Developer = () =&gt; {"{"}</p>
                <div className="pl-4 space-y-1.5 border-l border-theme">
                  <p className="text-theme-muted">name: <span className="text-theme-main font-medium">'Nguyen Duc Toan'</span>,</p>
                  <p className="text-theme-muted">role: <span className="text-theme-main font-medium">'Frontend / Backend / Fullstack'</span>,</p>
                  <p className="text-theme-muted">stack: [</p>
                  <p className="text-theme-main pl-4 font-medium">'Next.js', 'React', 'SSR',</p>
                  <p className="text-theme-main pl-4 font-medium">'Node.js', 'TypeScript'</p>
                  <p className="text-theme-muted">],</p>
                  <p className="text-theme-muted">passionateAbout: <span className="text-theme-main font-medium">'Clean Code & Performance'</span></p>
                </div>
                <p className="font-semibold text-theme-main">{"}"}</p>
              </div>

              {/* Accent overlay label */}
              <div className="mt-4 pt-3 border-t border-theme flex items-center justify-between text-xs text-theme-muted">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5" /> {t('hero.webDev')}
                </span>
                <span className="font-mono text-[10px] uppercase opacity-70">SSR Ready</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CvModal
        isOpen={isCvModalOpen}
        onClose={() => setIsCvModalOpen(false)}
        cvUrls={data?.cvUrls}
        defaultCvUrl={data?.cvUrl}
      />
    </section>
  )
}
