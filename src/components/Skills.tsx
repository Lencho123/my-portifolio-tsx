import Container from './Container'
import type { SkillsData } from '../types/skills'

interface SkillsProps {
  skills?: SkillsData
}

const defaultSkills: SkillsData = {
  languages: {
    name: 'Languages',
    skills: ['Go', 'Python', 'TypeScript', 'JavaScript', 'SQL'],
  },
  frameworks: {
    name: 'Frameworks',
    skills: ['Gin', 'Next.js', 'Node.js', 'React', 'FastAPI'],
  },
  databases: {
    name: 'Databases',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Supabase'],
  },
  tools: {
    name: 'Tools',
    skills: ['Docker', 'Git', 'Github','Trello', 'Jira','Postman', 'Swagger', 'CI/CD'],
  },
  engineeringPractices: {
    name: 'Engineering Practices',
    skills: [
      'Test Coverage (95–98%)',
      'API Design',
      'System Design',
      'Code Review',
    ],
  },
}

interface SkillCategoryProps {
  category: { name: string; skills: string[] }
}

function SkillCategoryCard({ category }: SkillCategoryProps) {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6">
      <h3 className="text-lg md:text-xl font-semibold text-neutral-900 dark:text-white mb-4">
        {category.name}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill, index) => (
          <span
            key={index}
            className="inline-flex items-center px-3 py-1.5 rounded-md text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-700 dark:hover:text-primary-400 transition-colors"
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Skills({ skills = defaultSkills }: SkillsProps) {
  const categories = [
    skills.languages,
    skills.frameworks,
    skills.databases,
    skills.tools,
    skills.engineeringPractices,
  ]

  return (
    <section
      id="skills"
      className="py-20 md:py-28 lg:py-32"
      aria-labelledby="skills-heading"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="skills-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Skills
          </h2>
          <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400 max-w-2xl">
            Technologies and practices I use to build reliable, scalable systems.
          </p>
        </div>

        {/* Skills Grid */}
        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {categories.map((category, index) => (
            <div key={index} className="w-full md:w-[calc(50%-1rem)] lg:w-[calc(33.333%-1.5rem)] max-w-sm">
              <SkillCategoryCard category={category} />
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

