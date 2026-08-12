'use client'

import { useState } from 'react'
import ProjectCard from '@/components/molecules/ProjectCard'
import { Project } from '@/interfaces/project'
import { FolderGit2 } from 'lucide-react'
import { useLanguage } from '@/context/LanguageContext'

interface ProjectsProps {
  data?: Project[]
}

export default function Projects({ data }: ProjectsProps) {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState('All')

  const defaultProjects: Project[] = [
    {
      id: 1,
      title: t('projects.items.project_1_title'),
      category: 'Fullstack',
      description: t('projects.items.project_1_desc'),
      tags: ['Next.js', 'TypeScript', 'MUI', 'TanStack Query', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 2,
      title: t('projects.items.project_2_title'),
      category: 'Frontend',
      description: t('projects.items.project_2_desc'),
      tags: ['React', 'TypeScript', 'Stripe', 'Zustand', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 3,
      title: t('projects.items.project_3_title'),
      category: 'Backend',
      description: t('projects.items.project_3_desc'),
      tags: ['Express', 'TypeScript', 'Redis', 'PostgreSQL'],
      image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      demoUrl: '#',
      githubUrl: '#'
    },
    {
      id: 4,
      title: t('projects.items.project_4_title'),
      category: 'Frontend',
      description: t('projects.items.project_4_desc'),
      tags: ['React Native', 'ChartJS', 'TailwindCSS'],
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
      demoUrl: '#',
      githubUrl: '#'
    }
  ]

  const projectsData: Project[] = (data && data.length > 0) ? data : defaultProjects

  const filteredProjects = activeTab === 'All' 
    ? projectsData 
    : projectsData.filter(p => p.category === activeTab)

  return (
    <section id="projects" className="py-24 px-6 border-t border-slate-200/60 dark:border-slate-800/60 bg-slate-50/50 dark:bg-[#070b12]/50 relative overflow-hidden">
      {/* Background radial glows */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 dark:bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute top-1/3 right-1/4 -translate-y-1/2 w-[350px] h-[350px] bg-violet-500/5 dark:bg-violet-500/10 rounded-full blur-[90px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 border border-indigo-500/20">
            <FolderGit2 className="w-3.5 h-3.5" />
            <span>{t('header.projects')}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            {t('projects.title')}
          </h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-indigo-500 to-violet-500 mx-auto rounded-full" />
          <p className="text-slate-600 dark:text-slate-400 max-w-xl mx-auto leading-relaxed">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center gap-2 mb-16 flex-wrap">
          {['All', 'Frontend', 'Backend', 'Fullstack'].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-300 cursor-pointer ${
                activeTab === tab
                  ? 'bg-gradient-to-tr from-indigo-500 to-violet-500 text-white border-transparent shadow-lg shadow-indigo-500/25 scale-[1.02]'
                  : 'bg-white dark:bg-white/5 text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-800/80 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10'
              }`}
            >
              {tab === 'All' 
                ? t('projects.categories.all', t('projects.all')) 
                : t(`projects.categories.${tab.toLowerCase()}`, tab)}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.id} className="animate-fade-in-up">
              <ProjectCard project={project} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
