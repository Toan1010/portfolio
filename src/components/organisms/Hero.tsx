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
    <section id="home" className="relative min-h-[calc(100vh-80px)] flex items-center pt-10 pb-20 px-6">
      <div className="max-w-7xl mx-auto grid md:grid-cols-12 gap-12 items-center w-full">
        {/* Left Hero Text */}
        <div className="md:col-span-7 flex flex-col justify-center space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-theme-card-subtle border border-theme text-theme-main w-fit text-sm font-bold tracking-wide">
            <Sparkles className="w-4 h-4 animate-pulse text-amber-500" /> {ready}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-theme-main">
              {t('hero.greeting')} <br />
              <span className="bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600 dark:from-emerald-400 dark:via-teal-300 dark:to-amber-300 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold opacity-85 text-theme-main">
              {role}
            </h2>
            <p className="text-base sm:text-lg opacity-80 max-w-xl leading-relaxed text-theme-main">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <button 
              onClick={() => setIsCvModalOpen(true)}
              className="px-6 py-3.5 rounded-xl bg-theme-accent font-bold hover:opacity-90 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <FileText className="w-5 h-5" />
              {t('hero.viewProjects')} <ArrowUpRight className="w-5 h-5" />
            </button>
            <a 
              href="#contact" 
              className="px-6 py-3.5 rounded-xl bg-theme-card border border-theme text-theme-main font-bold hover:opacity-90 transition-all duration-300 flex items-center gap-2"
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
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-theme-accent p-1.5 shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-theme-card rounded-[22px] overflow-hidden flex flex-col p-6 relative">
              {/* Tech background graphic */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Simulated IDE header */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-theme">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="text-xs opacity-70 ml-2 font-mono text-theme-main">portfolio-ssr.tsx</span>
              </div>

              {/* Simulated IDE code lines */}
              <div className="flex-1 font-mono text-xs text-left pt-4 space-y-2 overflow-hidden text-theme-main">
                <p className="opacity-90">import <span className="font-bold">{"{"} NextPage {"}"}</span> from <span className="opacity-75">'next'</span></p>
                <p className="font-bold">const <span>Developer</span> = () =&gt; {"{"}</p>
                <div className="pl-4 space-y-1.5 border-l border-theme">
                  <p className="opacity-80">name: <span className="font-semibold">'Nguyen Duc Toan'</span>,</p>
                  <p className="opacity-80">role: <span className="font-semibold">'Frontend / Backend / Fullstack'</span>,</p>
                  <p className="opacity-80">stack: [</p>
                  <p className="opacity-90 pl-4">'Next.js', 'React', 'SSR',</p>
                  <p className="opacity-90 pl-4">'Node.js', 'TypeScript'</p>
                  <p className="opacity-80">],</p>
                  <p className="opacity-80">passionateAbout: <span className="font-semibold">'Clean Code & Performance'</span></p>
                </div>
                <p className="font-bold">{"}"}</p>
              </div>

              {/* Accent overlay label */}
              <div className="absolute bottom-4 right-4 bg-theme-accent px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1 shadow-sm">
                <Terminal className="w-3.5 h-3.5" /> {t('hero.webDev')}
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
