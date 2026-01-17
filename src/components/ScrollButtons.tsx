import { useState, useEffect } from 'react'

export default function ScrollButtons() {
  const [showTop, setShowTop] = useState(false)
  const [showBottom, setShowBottom] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop
      const scrollHeight = document.documentElement.scrollHeight
      const clientHeight = document.documentElement.clientHeight
      const scrollBottom = scrollHeight - scrollTop - clientHeight

      // Show top button when scrolled down more than 300px
      setShowTop(scrollTop > 300)
      // Show bottom button when not at bottom (more than 100px from bottom)
      setShowBottom(scrollBottom > 100)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Check initial state

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const scrollToBottom = () => {
    window.scrollTo({ top: document.documentElement.scrollHeight, behavior: 'smooth' })
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
      {/* Scroll to Top Button */}
      {showTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="
            scroll-button-glass scroll-button-glow
            p-3 rounded-full
            text-primary-600 dark:text-primary-400
            hover:text-primary-700 dark:hover:text-primary-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800
            transition-all duration-300 ease-in-out
          "
          aria-label="Scroll to top"
        >
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
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Scroll to Bottom Button */}
      {showBottom && (
        <button
          type="button"
          onClick={scrollToBottom}
          className="
            scroll-button-glass scroll-button-glow
            p-3 rounded-full
            text-primary-600 dark:text-primary-400
            hover:text-primary-700 dark:hover:text-primary-300
            focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-neutral-800
            transition-all duration-300 ease-in-out
          "
          aria-label="Scroll to bottom"
        >
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
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      )}
    </div>
  )
}

