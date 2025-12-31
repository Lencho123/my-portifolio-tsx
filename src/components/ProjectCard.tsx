import type { Project } from '../types/project'

interface ProjectCardProps {
  project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const formatTechStack = (techStack: Project['techStack']): string[] => {
    const items: string[] = []
    if (techStack.languages) items.push(...techStack.languages)
    if (techStack.frameworks) items.push(...techStack.frameworks)
    if (techStack.databases) items.push(...techStack.databases)
    if (techStack.tools) items.push(...techStack.tools)
    if (techStack.services) items.push(...techStack.services)
    return items
  }

  const techItems = formatTechStack(project.techStack)
  
  // Determine the primary link (prefer live, fallback to GitHub)
  const primaryLink = project.links?.live || project.links?.github
  const linkLabel = project.links?.live ? 'View Live' : 'View on GitHub'

  return (
    <article
      className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 overflow-hidden hover:shadow-xl transition-all duration-300 group"
      aria-labelledby={`project-${project.id}-title`}
    >
      {/* Project Image - Clickable */}
      {project.image && primaryLink && (
        <a
          href={primaryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="block relative overflow-hidden bg-neutral-100"
          aria-label={`${linkLabel} - ${project.title} (opens in new tab)`}
        >
          <div className="relative aspect-video w-full overflow-hidden">
            <img
              src={project.image}
              alt={project.title}
              className="
                w-full h-full object-cover
                transform transition-all duration-500 ease-out
                group-hover:scale-110 group-hover:brightness-105
              "
            />
            {/* Overlay on hover */}
            <div className="
              absolute inset-0 bg-primary-600/0
              group-hover:bg-primary-600/20
              transition-all duration-300
              flex items-center justify-center
            ">
              <div className="
                opacity-0 group-hover:opacity-100
                transform translate-y-4 group-hover:translate-y-0
                transition-all duration-300
                bg-white/90 backdrop-blur-sm
                px-6 py-3 rounded-lg
                font-medium text-primary-700
                flex items-center gap-2
              ">
                {linkLabel}
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </div>
            </div>
          </div>
        </a>
      )}

      {/* Card Content */}
      <div className="p-6 md:p-8">
        {/* Header */}
        <div className="mb-6">
          <div className="flex items-start justify-between mb-3">
            <h3
              id={`project-${project.id}-title`}
              className="text-2xl md:text-3xl font-bold text-neutral-900 dark:text-white"
            >
              {project.title}
            </h3>
            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-700 flex-shrink-0 ml-4">
              {project.type}
            </span>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide mb-3">
            Tech Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {techItems.map((tech, index) => (
              <span
                key={index}
                className="inline-flex items-center px-3 py-1 rounded-md text-sm font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        {project.links && (
          <div className="flex flex-wrap gap-4 pt-4 border-t border-neutral-200 dark:border-neutral-700">
            {project.links.live && (
              <a
                href={project.links.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                aria-label={`View ${project.title} live (opens in new tab)`}
              >
                Live Demo
                <svg
                  className="ml-1.5 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
            {project.links.github && (
              <a
                href={project.links.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-sm font-medium text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
                aria-label={`View ${project.title} on GitHub (opens in new tab)`}
              >
                GitHub
                <svg
                  className="ml-1.5 w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  )
}
