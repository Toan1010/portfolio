'use client'

import { Sparkles, ArrowUpRight, Terminal } from 'lucide-react'
import StatItem from '@/components/molecules/StatItem'
import { getBilingualText } from '@/lib/i18n-helpers'
import { useLanguage } from '@/context/LanguageContext'

interface HeroProps {
  data?: any
}

export default function Hero({ data }: HeroProps) {
  const { t, language } = useLanguage()

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
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500/10 dark:bg-indigo-500/15 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-600 dark:text-indigo-300 w-fit text-sm font-semibold tracking-wide">
            <Sparkles className="w-4 h-4 animate-pulse" /> {ready}
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight text-slate-900 dark:text-white">
              {t('hero.greeting')} <br />
              <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-pink-500 bg-clip-text text-transparent">
                {name}
              </span>
            </h1>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-500 dark:text-slate-400">
              {role}
            </h2>
            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-4 pt-4">
            <a 
              href={data?.cvUrl || '/MyCV.pdf'} 
              download
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-indigo-500 to-violet-500 text-white font-bold hover:shadow-lg hover:shadow-indigo-500/30 hover:scale-[1.02] transition-all duration-300 flex items-center gap-2"
            >
              {t('hero.viewProjects')} <ArrowUpRight className="w-5 h-5" />
            </a>
            <a 
              href="#contact" 
              className="px-6 py-3.5 rounded-xl bg-slate-200 hover:bg-slate-300 dark:bg-slate-800 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700/80 text-slate-800 dark:text-white font-bold transition-all duration-300 flex items-center gap-2"
            >
              {t('hero.contactNow')}
            </a>
          </div>

          {/* Micro stats / Tech logs */}
          <div className="pt-8 grid grid-cols-3 gap-6 border-t border-slate-200 dark:border-slate-800/80 max-w-md">
            <StatItem value={statsYears} label={t('hero.statsYears')} />
            <StatItem value={statsProjects} label={t('hero.statsProjects')} />
            <StatItem value={statsClients} label={t('hero.statsClients')} />
          </div>
        </div>

        {/* Right Hero Image/Animation */}
        <div className="md:col-span-5 flex justify-center relative">
          <div className="relative w-72 h-72 sm:w-96 sm:h-96 rounded-3xl bg-gradient-to-tr from-indigo-600 to-violet-600 p-1.5 shadow-2xl shadow-indigo-500/10 dark:shadow-indigo-500/5 rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-[#0f1424] rounded-[22px] overflow-hidden flex flex-col p-6 relative">
              {/* Tech background graphic */}
              <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:24px_24px]" />
              
              {/* Simulated IDE header */}
              <div className="flex items-center gap-1.5 pb-4 border-b border-slate-800">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="text-xs text-slate-500 ml-2 font-mono">portfolio-ssr.tsx</span>
              </div>

              {/* Simulated IDE code lines */}
              <div className="flex-1 font-mono text-xs text-left pt-4 space-y-2 overflow-hidden">
                <p className="text-pink-400">import <span className="text-slate-300">{"{"} NextPage {"}"}</span> from <span className="text-green-400">'next'</span></p>
                <p className="text-blue-400">const <span className="text-yellow-400">Developer</span> = () =&gt; {"{"}</p>
                <div className="pl-4 space-y-1.5 border-l border-slate-800">
                  <p className="text-slate-400">name: <span className="text-green-400">'Nguyen Duc Toan'</span>,</p>
                  <p className="text-slate-400">role: <span className="text-green-400">'Frontend Developer'</span>,</p>
                  <p className="text-slate-400">stack: [</p>
                  <p className="text-green-400 pl-4">'Next.js', 'React', 'SSR',</p>
                  <p className="text-green-400 pl-4">'TailwindCSS', 'TypeScript'</p>
                  <p className="text-slate-400">],</p>
                  <p className="text-slate-400">passionateAbout: <span className="text-green-400">'SSR & SEO'</span></p>
                </div>
                <p className="text-blue-400">{"}"}</p>
              </div>

              {/* Accent overlay label */}
              <div className="absolute bottom-4 right-4 bg-indigo-500/10 border border-indigo-500/30 text-indigo-400 px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1">
                <Terminal className="w-3.5 h-3.5" /> {t('hero.webDev')}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
