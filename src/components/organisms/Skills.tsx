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
    <section id="skills" className="py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-3">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">{t('skills.title')}</h2>
          <div className="h-1 w-12 bg-theme-accent mx-auto rounded-full" />
          <p className="text-sm sm:text-base text-theme-muted">{t('skills.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Frontend Skills Box */}
          <div className="p-6 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/30 transition-all text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold border border-theme">
                <Code className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-theme-main">Frontend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {frontendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 text-xs font-semibold rounded-lg bg-theme-card-subtle text-theme-main border border-theme">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Skills Box */}
          <div className="p-6 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/30 transition-all text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold border border-theme">
                <Server className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-theme-main">Backend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {backendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 text-xs font-semibold rounded-lg bg-theme-card-subtle text-theme-main border border-theme">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Database Skills Box */}
          <div className="p-6 rounded-xl bg-theme-card border border-theme hover:border-theme-accent/30 transition-all text-left">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-9 h-9 rounded-lg bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold border border-theme">
                <Database className="w-4 h-4" />
              </div>
              <h3 className="font-bold text-lg text-theme-main">Databases & DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {devopsSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3 py-1 text-xs font-semibold rounded-lg bg-theme-card-subtle text-theme-main border border-theme">
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
