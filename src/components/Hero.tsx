import Container from './Container'
import heroImage from '../assets/hero-image.JPG'

interface CTAButton {
  label: string
  href: string
  variant?: 'primary' | 'secondary'
  ariaLabel?: string
}

interface HeroProps {
  name?: string
  title?: string
  summary?: string
  ctaButtons?: CTAButton[]
}

const defaultCTAButtons: CTAButton[] = [
  {
    label: 'View Projects',
    href: '#projects',
    variant: 'primary',
    ariaLabel: 'Navigate to projects section',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/Lencho123',
    variant: 'secondary',
    ariaLabel: 'Visit GitHub profile (opens in new tab)',
  },
]

export default function Hero({
  name = 'Lencho Lachisa',
  title = 'Software Engineer',
  summary = 'I am a software engineer focused on building secure, scalable software systems using ExpressJS, Go and TypeScript. I enjoy working on backend services, APIs, and systems that need to be reliable and easy to maintain.',
  ctaButtons = defaultCTAButtons,
}: HeroProps) {
  return (
    <section
      id="home"
      className="py-20 md:py-28 lg:py-32 bg-white dark:bg-neutral-900"
      aria-labelledby="hero-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-16 items-center">
          {/* Image - Left Side */}
          <div className="order-2 lg:order-1 flex justify-center lg:justify-start">
            <div className="relative w-full max-w-md">
              <img
                src={heroImage}
                alt="Lencho Lachisa - Software Engineer"
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>

          {/* Content - Right Side */}
          <div className="order-1 lg:order-2">
            {/* Name */}
            <h1
              id="hero-heading"
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 dark:text-white mb-4 md:mb-6"
            >
              {name}
            </h1>

            {/* Title */}
            <h2 className="text-xl md:text-2xl lg:text-3xl font-semibold text-primary-600 dark:text-primary-400 mb-6 md:mb-8">
              {title}
            </h2>

            {/* Summary */}
            <p className="text-base md:text-lg lg:text-xl text-neutral-700 dark:text-neutral-300 leading-relaxed mb-8 md:mb-10">
              {summary}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              {ctaButtons.map((button) => {
                const isExternal = button.href.startsWith('http')
                const isPrimary = button.variant === 'primary'

                return (
                  <a
                    key={button.href}
                    href={button.href}
                    className={`
                      inline-flex items-center justify-center
                      px-6 md:px-8 py-3 md:py-4
                      text-base md:text-lg font-medium
                      rounded-md
                      transition-all duration-200
                      focus:outline-none focus:ring-2 focus:ring-offset-2
                      ${
                        isPrimary
                          ? 'bg-primary-600 text-white hover:bg-primary-700 focus:ring-primary-500 shadow-sm hover:shadow-md'
                          : 'bg-white dark:bg-neutral-800 text-primary-600 dark:text-primary-400 border-2 border-primary-600 dark:border-primary-500 hover:bg-primary-50 dark:hover:bg-neutral-700 focus:ring-primary-500'
                      }
                    `}
                    aria-label={button.ariaLabel || button.label}
                    {...(isExternal && {
                      target: '_blank',
                      rel: 'noopener noreferrer',
                    })}
                  >
                    {button.label}
                    {isExternal && (
                      <svg
                        className="ml-2 w-4 h-4"
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
                    )}
                  </a>
                )
              })}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

