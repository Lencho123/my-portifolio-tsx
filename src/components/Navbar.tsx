import { useState, useEffect } from 'react'
import Container from './Container'
import ThemeToggle from './ThemeToggle'

interface NavLink {
  label: string
  href: string
  ariaLabel?: string
}

interface NavbarProps {
  links?: NavLink[]
}

const defaultLinks: NavLink[] = [
  { label: 'Home', href: '#home', ariaLabel: 'Navigate to home section' },
  { label: 'About', href: '#about', ariaLabel: 'Navigate to about section' },
  { label: 'Projects', href: '#projects', ariaLabel: 'Navigate to projects section' },
  { label: 'Experience', href: '#experience', ariaLabel: 'Navigate to experience section' },
  { label: 'Skills', href: '#skills', ariaLabel: 'Navigate to skills section' },
  { label: 'Contact', href: '#contact', ariaLabel: 'Navigate to contact section' },
]

export default function Navbar({ links = defaultLinks }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isScrolled, setIsScrolled] = useState<boolean>(false)

  // Handle scroll for sticky header styling
  useEffect(() => {
    const handleScroll = (): void => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when clicking outside or on a link
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('nav')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('click', handleClickOutside)
      // Prevent body scroll when menu is open
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.removeEventListener('click', handleClickOutside)
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  const handleLinkClick = (): void => {
    setIsMenuOpen(false)
  }

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>): void => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      setIsMenuOpen(!isMenuOpen)
    } else if (event.key === 'Escape') {
      setIsMenuOpen(false)
    }
  }

  return (
    <header
      className={`
        sticky top-0 z-50 w-full
        transition-all duration-200
        ${isScrolled 
          ? 'bg-white/95 dark:bg-neutral-900/95 backdrop-blur-sm shadow-sm border-b border-neutral-200 dark:border-neutral-800' 
          : 'bg-white dark:bg-neutral-900'
        }
      `}
      role="banner"
    >
      <Container>
        <nav
          className="flex items-center justify-between h-16 md:h-20"
          role="navigation"
          aria-label="Main navigation"
        >
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <a
              href="#home"
              className="text-xl md:text-2xl font-bold text-neutral-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
              aria-label="Navigate to home"
            >
              2L
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-2 text-sm lg:text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                aria-label={link.ariaLabel || `Navigate to ${link.label.toLowerCase()} section`}
              >
                {link.label}
              </a>
            ))}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="md:hidden p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800 transition-colors"
            aria-label={isMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={isMenuOpen}
            aria-controls="mobile-menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            onKeyDown={handleKeyDown}
          >
            <span className="sr-only">{isMenuOpen ? 'Close menu' : 'Open menu'}</span>
            <div className="w-6 h-6 flex flex-col justify-center space-y-1.5">
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? 'opacity-0' : ''
                }`}
                aria-hidden="true"
              />
              <span
                className={`block h-0.5 w-6 bg-current transition-all duration-300 ${
                  isMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
                aria-hidden="true"
              />
            </div>
          </button>
        </nav>

        {/* Mobile Navigation Menu */}
        <div
          id="mobile-menu"
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
          aria-hidden={!isMenuOpen}
        >
          <nav
            className="py-4 space-y-1 border-t border-neutral-200 dark:border-neutral-800"
            role="navigation"
            aria-label="Mobile navigation"
          >
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block px-4 py-3 text-base font-medium text-neutral-700 dark:text-neutral-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-neutral-50 dark:hover:bg-neutral-800 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800"
                aria-label={link.ariaLabel || `Navigate to ${link.label.toLowerCase()} section`}
                onClick={handleLinkClick}
              >
                {link.label}
              </a>
            ))}
          </nav>
          <div className="px-4 py-3 border-t border-neutral-200 dark:border-neutral-800">
            <ThemeToggle />
          </div>
        </div>
      </Container>
    </header>
  )
}

