import Container from './Container'

interface FooterProps {
  name?: string
  role?: string
}

export default function Footer({
  name = 'Lencho Lachisa Nagasa',
  role = 'Software Engineer',
}: FooterProps) {
  return (
    <footer
      className="py-8 md:py-10 bg-neutral-50 dark:bg-neutral-800 border-t border-neutral-200 dark:border-neutral-700"
      role="contentinfo"
    >
      <Container>
        <div className="flex justify-center items-center flex-col md:flex-row items-center justify-between gap-2 text-center md:text-left">
          <div className="text-center w-5/6">
            <p className="text-sm md:text-base font-medium text-neutral-900 dark:text-white">{name}</p>
            <p className="text-xs md:text-sm text-neutral-600 dark:text-neutral-400">{role}</p>
          </div>
        </div>
      </Container>
    </footer>
  )
}

