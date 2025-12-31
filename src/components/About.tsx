import Container from './Container'

interface AboutCard {
  id: string
  title: string
  description: string
  icon?: string
}

interface AboutProps {
  cards?: AboutCard[]
}

const defaultCards: AboutCard[] = [
  {
    id: 'a2sv',
    title: 'A2SV Training',
    description: 'Trained at Africa to Silicon Valley by Google. Focused on production-ready systems and engineering fundamentals.',
  },
  {
    id: 'competitive',
    title: '800+ Problems',
    description: 'Solved on LeetCode & Codeforces. Deep understanding of algorithms and data structures.',
  },
  {
    id: 'teaching',
    title: 'Teaching Assitant',
    description: 'Python & DSA courses. Helped students understand core concepts.',
  },
  { id: 'web-development',
    title: 'Web Development',
    description: 'Building scalable web applications with secure authentication, well-structured APIs, and maintainable frontend and backend systems.',
  },
]

export default function About({ cards = defaultCards }: AboutProps) {
  return (
    <section
      id="about"
      className="py-20 md:py-28 lg:py-32 bg-neutral-50 dark:bg-neutral-800"
      aria-labelledby="about-heading"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="about-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            About Me
          </h2>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {cards.map((card, index) => (
            <div
              key={card.id}
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
            >
              {/* Card Title */}
              <h3 className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white mb-3 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-300">
                {card.title}
              </h3>

              {/* Card Description */}
              <p className="text-sm md:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed">
                {card.description}
              </p>
            </div>
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
