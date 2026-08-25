import { getPortfolioData } from '@/lib/portfolio-data'
import Hero from '@/components/organisms/Hero'
import About from '@/components/organisms/About'
import Skills from '@/components/organisms/Skills'
import Projects from '@/components/organisms/Projects'
import Contact from '@/components/organisms/Contact'

export const dynamic = 'force-dynamic'

export default async function HomePage() {
  const data = await getPortfolioData()

  return (
    <>
      <Hero data={data?.hero} />
      <About data={data?.about} />
      <Skills data={data?.skills} />
      <Projects data={data?.projects} />
      <Contact data={data?.contact} />
    </>
  )
}
