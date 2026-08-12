'use client'

import Image from 'next/image'
import { Project } from '@/interfaces/project'
import { ExternalLink, Github } from 'lucide-react'
import { getBilingualText } from '@/lib/i18n-helpers'
import { useLanguage } from '@/context/LanguageContext'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const { t, language } = useLanguage()

  const title = getBilingualText(project.title, language)
  const description = getBilingualText(project.description, language)

  return (
    <div className="group rounded-2xl bg-white dark:bg-white/5 border border-slate-200 dark:border-slate-800/80 overflow-hidden hover:border-indigo-500/40 hover:shadow-xl dark:hover:shadow-indigo-500/5 transition-all duration-300 flex flex-col h-full text-left">
      {/* Project Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold bg-slate-900/80 backdrop-blur-md text-indigo-400 border border-indigo-500/20">
          {project.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4">
        <div className="space-y-2">
          <h3 className="text-xl font-bold text-slate-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {title}
          </h3>
          <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2 border-t border-slate-100 dark:border-slate-800/80">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-indigo-500/10 hover:bg-indigo-500 text-indigo-600 dark:text-indigo-400 hover:text-white font-semibold text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('projects.demo')}</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:bg-slate-200 dark:hover:bg-white/10 text-slate-700 dark:text-slate-300 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5" />
              <span>{t('projects.source')}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
