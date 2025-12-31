import Container from './Container'
import type { Experience as ExperienceType } from '../types/experience'

interface ExperienceProps {
  experiences?: ExperienceType[]
}

const defaultExperiences: ExperienceType[] = [
  {
    id: 'eskalate-intern',
    title: 'Software Developer Intern',
    company: 'Eskalate',
    type: 'Internship',
    startDate: 'Nov2025',
    endDate: 'Present',
    summary: 'Built authentication system for 5,000+ users with JWT, Redis, and OAuth2. Achieved 95–98% test coverage.',
    technologies: ['Go', 'Gin', 'JWT', 'Redis', 'OAuth2', 'MongoDB', 'Docker'],
  },
  {
    id: 'teaching-assistant',
    title: 'Teaching Assistant',
    company: 'Python & Data Structures & Algorithms',
    type: 'Part-time',
    startDate: '2024',
    endDate: '2025',
    summary: 'Assisted students with programming concepts, code debugging, and algorithmic problem-solving.',
    technologies: ['Python', 'Data Structures', 'Algorithms'],
  },
]

export default function Experience({ experiences = defaultExperiences }: ExperienceProps) {
  return (
    <section
      id="experience"
      className="py-20 md:py-28 lg:py-32 bg-neutral-50 dark:bg-neutral-800"
      aria-labelledby="experience-heading"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="experience-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Experience & Leadership
          </h2>
        </div>

        {/* Experience Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {experiences.map((experience, index) => (
            <article
              key={experience.id}
              className="
                group
                bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8
                hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-600
                transition-all duration-300 ease-out
                transform hover:-translate-y-1
                opacity-0
              "
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 100}ms forwards`,
              }}
              aria-labelledby={`experience-${experience.id}-title`}
            >
              {/* Header */}
              <div className="mb-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3
                      id={`experience-${experience.id}-title`}
                      className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-1 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300"
                    >
                      {experience.title}
                    </h3>
                    <p className="text-lg font-medium text-primary-600 dark:text-primary-400">
                      {experience.company}
                    </p>
                  </div>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs md:text-sm font-medium bg-primary-100 text-primary-700 flex-shrink-0 ml-4">
                    {experience.type}
                  </span>
                </div>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {experience.startDate} – {experience.endDate}
                </p>
              </div>

              {/* Summary */}
              <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed mb-4">
                {experience.summary}
              </p>

              {/* Technologies */}
              {experience.technologies && experience.technologies.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-neutral-200 dark:border-neutral-700">
                  {experience.technologies.map((tech, techIndex) => (
                    <span
                      key={techIndex}
                      className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              )}
            </article>
          ))}
        </div>
      </Container>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  )
}
