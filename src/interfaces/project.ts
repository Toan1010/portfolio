export interface Project {
  id: number
  title: string
  category: 'Frontend' | 'Backend' | 'Fullstack'
  description: string
  tags: string[]
  image: string
  demoUrl: string
  githubUrl: string
}
