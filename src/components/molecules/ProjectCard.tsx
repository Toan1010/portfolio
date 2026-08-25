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
    <div className="group rounded-xl bg-theme-card border border-theme overflow-hidden hover:border-theme-accent/40 hover:shadow-md transition-all duration-300 flex flex-col h-full text-left">
      {/* Project Image */}
      <div className="relative h-48 sm:h-52 w-full overflow-hidden bg-theme-card-subtle">
        <Image
          src={project.image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, 50vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md text-[11px] font-semibold bg-theme-accent border border-theme">
          {project.category}
        </div>
      </div>

      {/* Card Content */}
      <div className="p-5 flex flex-col flex-1 justify-between space-y-4 text-theme-main">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-theme-main">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-theme-muted leading-relaxed line-clamp-3">
            {description}
          </p>
        </div>

        {/* Tech tags */}
        <div className="space-y-4 pt-2">
          <div className="flex flex-wrap gap-1.5">
            {project.tags?.map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 text-[11px] font-medium rounded-md bg-theme-card-subtle text-theme-main border border-theme"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2.5 pt-3 border-t border-theme">
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 py-2 rounded-lg bg-theme-accent font-semibold text-xs hover:opacity-90 transition-all flex items-center justify-center gap-1.5"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>{t('projects.demo')}</span>
            </a>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-2 rounded-lg bg-theme-card-subtle border border-theme text-theme-main font-semibold text-xs hover:bg-theme-card transition-colors flex items-center justify-center gap-1.5"
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
