import Container from './Container'
import ProjectCard from './ProjectCard'
import type { Project } from '../types/project'
import kennaImage from '../assets/kenna.png'
import remedymateImage from '../assets/remedymate.png'
import iknowImage from '../assets/iknow.png'

interface ProjectsProps {
  projects?: Project[]
}

const defaultProjects: Project[] = [
  {
    id: 'kenna-learning',
    title: 'Kenna Learning',
    type: 'Full-Stack',
    image: kennaImage,
    techStack: {
      languages: ['Go', 'TypeScript'],
      frameworks: ['Gin', 'React'],
      databases: ['MongoDB', 'Supabase'],
      tools: [],
    },
    links: {
      github: 'https://github.com/Lencho123/Kenna-Learning-site',
      live: 'https://kenna-user-panel.vercel.app/',
    },
  },
  {
    id: 'remedymate',
    title: 'RemedyMate',
    type: 'Backend',
    image: remedymateImage,
    techStack: {
      languages: ['Go'],
      frameworks: ['Gin'],
      databases: ['MongoDB'],
      tools: ['Redis','Postman'],
    },
    links: {
      github: 'https://github.com/RemedyMate',
    },
  },
  {
    id: 'iknow',
    title: 'IKnow',
    type: 'Backend',
    image: iknowImage,
    techStack: {
      languages: ['Go'],
      frameworks: ['Gin'],
      databases: ['MongoDB'],
      tools: ['WebSockets', 'Swagger', 'Postman'],
    },
    links: {
      github: 'https://github.com/chera-mihiretu/lazyMe',
      live: 'https://lazyme.vercel.app/',
    },
  },
]

export default function Projects({ projects = defaultProjects }: ProjectsProps) {
  return (
    <section
      id="projects"
      className="py-20 md:py-28 lg:py-32 bg-white dark:bg-neutral-900"
      aria-labelledby="projects-heading"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="projects-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Featured Projects
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Projects I have built, focusing on practical solutions and real-world impact.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
          {projects.map((project, index) => {
            // Center the third card (index 2) when there are exactly 3 projects
            const isThirdCard = projects.length === 3 && index === 2
            return (
              <div
                key={project.id}
                className={isThirdCard ? 'lg:col-span-2 lg:flex lg:justify-center' : ''}
              >
                <div className={isThirdCard ? 'lg:max-w-2xl lg:w-full' : ''}>
                  <ProjectCard project={project} />
                </div>
              </div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

