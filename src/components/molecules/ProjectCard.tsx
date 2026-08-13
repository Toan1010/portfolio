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
    <div className="group rounded-2xl bg-theme-card border border-theme overflow-hidden hover:scale-[1.01] hover:shadow-xl transition-all duration-300 flex flex-col h-full text-left">
      {/* Project Image */}
      <div className="relative h-48 sm:h-56 w-full overflow-hidden bg-slate-900">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
        />
        <div className="absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-extrabold bg-theme-accent border border-theme">
          {project.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-6 flex flex-col flex-1 justify-between space-y-4 text-theme-main">
        <div className="space-y-2">
          <h3 className="text-xl font-extrabold text-theme-main">
            {title}
          </h3>
          <p className="text-sm opacity-85 leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs font-bold rounded-lg bg-theme-card-subtle text-theme-main border border-theme"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-3 pt-2 border-t border-theme">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2.5 rounded-xl bg-theme-accent font-bold text-xs hover:opacity-90 transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('projects.demo')}</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-2.5 rounded-xl bg-theme-card-subtle text-theme-main font-bold text-xs transition-colors flex items-center justify-center gap-1.5"
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
