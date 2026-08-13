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
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-theme-main">{t('skills.title')}</h2>
          <div className="h-1 w-20 bg-theme-accent mx-auto rounded-full" />
          <p className="opacity-80 text-theme-main">{t('skills.subtitle')}</p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Frontend Skills Box */}
          <div className="p-8 rounded-2xl bg-theme-card border border-theme hover:scale-[1.01] transition-transform text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold">
                <Code className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-theme-main">Frontend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {frontendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-bold rounded-xl bg-theme-card-subtle text-theme-main border border-theme transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Backend Skills Box */}
          <div className="p-8 rounded-2xl bg-theme-card border border-theme hover:scale-[1.01] transition-transform text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold">
                <Server className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-theme-main">Backend Development</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {backendSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-bold rounded-xl bg-theme-card-subtle text-theme-main border border-theme transition-colors">
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* DevOps & Database Skills Box */}
          <div className="p-8 rounded-2xl bg-theme-card border border-theme hover:scale-[1.01] transition-transform text-left">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-theme-card-subtle text-theme-main flex items-center justify-center font-bold">
                <Database className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-xl text-theme-main">Databases & DevOps</h3>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {devopsSkills.map((skill: string, index: number) => (
                <span key={index} className="px-3.5 py-1.5 text-sm font-bold rounded-xl bg-theme-card-subtle text-theme-main border border-theme transition-colors">
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
