import Container from './Container'
import type { Achievement } from '../types/achievement'

interface AchievementsProps {
  achievements?: Achievement[]
}

const defaultAchievements: Achievement[] = [
  {
    id: 'zindi-bootcamp',
    title: 'Top 5',
    description: 'Data Science Bootcamp',
    platform: 'Zindi',
    link: 'https://zindi.africa',
  },
  {
    id: 'competitive-programming',
    title: '800+ Problems Solved',
    description: 'LeetCode & Codeforces',
    platform: 'Competitive Programming',
  },
]

export default function Achievements({ achievements = defaultAchievements }: AchievementsProps) {
  return (
    <section
      id="achievements"
      className="py-20 md:py-28 lg:py-32 bg-neutral-50 dark:bg-neutral-800"
      aria-labelledby="achievements-heading"
    >
      <Container>
        {/* Section Heading */}
        <div className="mb-12 md:mb-16">
          <h2
            id="achievements-heading"
            className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
          >
            Achievements
          </h2>
        </div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 max-w-3xl">
          {achievements.map((achievement) => {
            const content = (
              <div className="bg-white dark:bg-neutral-900 rounded-lg border border-neutral-200 dark:border-neutral-700 p-6 md:p-8 hover:shadow-lg transition-shadow duration-200">
                <div className="mb-2">
                  <h3 className="text-2xl md:text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-base md:text-lg text-neutral-700 dark:text-neutral-300 font-medium">
                    {achievement.description}
                  </p>
                  {achievement.platform && (
                    <p className="text-sm md:text-base text-neutral-500 dark:text-neutral-400 mt-2">
                      {achievement.platform}
                    </p>
                  )}
                </div>
              </div>
            )

            return achievement.link ? (
              <a
                key={achievement.id}
                href={achievement.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
                aria-label={`View ${achievement.title} on ${achievement.platform} (opens in new tab)`}
              >
                {content}
              </a>
            ) : (
              <div key={achievement.id}>{content}</div>
            )
          })}
        </div>
      </Container>
    </section>
  )
}

