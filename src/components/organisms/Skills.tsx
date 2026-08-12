'use client'

import { Code, Server, Database } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface SkillsProps {
  data?: any
}

export default function Skills({ data }: SkillsProps) {
  const { t } = useLanguage()

  const frontendSkills = data?.frontend || ['Next.js (SSR/SSG)', 'React 19', 'TypeScript', 'TailwindCSS v4', 'Vite', 'HTML5/CSS3', 'Zustand / Redux', 'ES6+']
  const backendSkills = data?.backend || ['Node.js', 'Express.js', 'NestJS', 'Spring Boot', 'RESTful APIs', 'GraphQL', 'JWT Auth', 'Websockets']
  const devopsSkills = data?.devops || ['PostgreSQL', 'MongoDB', 'MySQL', 'Redis Cache', 'Docker', 'Git / GitHub', 'CI/CD (GitHub Actions)', 'Vercel']

  return (
    <section id="skills" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">{t('skills.title')}</h2>
          <div className="h-1 w-20 bg-indigo-500 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400">{t('skills.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Skills Box */}
          <div className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-indigo-500/30 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Frontend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {frontendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-500/5 text-indigo-600 dark:text-indigo-300 border border-indigo-100 dark:border-indigo-500/20 hover:bg-indigo-100 dark:hover:bg-indigo-500/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Skills Box */}
          <div className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-violet-500/30 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-violet-500/10 text-violet-600 dark:text-violet-400 flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Backend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {backendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-semibold rounded-xl bg-violet-50 dark:bg-violet-500/5 text-violet-600 dark:text-violet-300 border border-violet-100 dark:border-violet-500/20 hover:bg-violet-100 dark:hover:bg-violet-500/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Database Skills Box */}
          <div className="p-8 rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 hover:border-blue-500/30 hover:shadow-lg dark:hover:shadow-none transition-all duration-300 text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-slate-900 dark:text-white">Databases & DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {devopsSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-semibold rounded-xl bg-blue-50 dark:bg-blue-500/5 text-blue-600 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20 hover:bg-blue-100 dark:hover:bg-blue-500/10 transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
