import { useState } from 'react'
import type { FormEvent } from 'react'
import Container from './Container'
import type { ContactLink } from '../types/contact'

interface ContactProps {
  links?: ContactLink[]
  email?: string
}

interface FormData {
  email: string
  message: string
}

interface FormErrors {
  email?: string
  message?: string
}

const defaultLinks: ContactLink[] = [
  {
    id: 'email',
    label: 'Email',
    href: 'mailto:lencholachisa11@gmail.com',
    icon: 'email',
    ariaLabel: 'Send email to Lencho Lachisa Nagasa',
    isExternal: false,
  },
  {
    id: 'github',
    label: 'GitHub',
    href: 'https://github.com/Lencho123',
    icon: 'github',
    ariaLabel: 'Visit GitHub profile (opens in new tab)',
    isExternal: true,
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/lencho-lachisa-linckedin/',
    icon: 'linkedin',
    ariaLabel: 'Visit LinkedIn profile (opens in new tab)',
    isExternal: true,
  },
  {
    id: 'resume',
    label: 'Resume',
    href: 'https://drive.google.com/file/d/1dZv5D5bIVlk5ZMwYVovHt63SHU4FtsYf/view?usp=sharing',
    icon: 'resume',
    ariaLabel: 'Download resume (PDF)',
    isExternal: false,
    isDownload: true,
  },
]

// Icon components
function EmailIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        fillRule="evenodd"
        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        clipRule="evenodd"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  )
}

function ResumeIcon() {
  return (
    <svg
      className="w-6 h-6"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
  )
}

function getIcon(iconType: ContactLink['icon']) {
  switch (iconType) {
    case 'email':
      return <EmailIcon />
    case 'github':
      return <GitHubIcon />
    case 'linkedin':
      return <LinkedInIcon />
    case 'resume':
      return <ResumeIcon />
    default:
      return null
  }
}

export default function Contact({ links = defaultLinks, email }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    message: '',
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Here you would typically send the form data to a backend API
      // For now, we'll simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Simulate success
      setSubmitStatus('success')
      setFormData({ email: '', message: '' })
      setErrors({})

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } catch (error) {
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 3000)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <section
      id="contact"
      className="py-20 md:py-28 lg:py-32 bg-white dark:bg-neutral-900"
      aria-labelledby="contact-heading"
    >
      <Container>
        <div className="max-w-3xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 md:mb-16">
            <h2
              id="contact-heading"
              className="text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-900 dark:text-white mb-4"
            >
              Get In Touch
            </h2>
            <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-400">
              Open to opportunities and collaborations. Let's connect.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
            {/* Contact Form */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                Send a Message
              </h3>
              <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Email Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`
                      w-full px-4 py-3 rounded-lg border
                      text-base text-neutral-900 dark:text-neutral-100
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                      transition-all duration-200
                      ${
                        errors.email
                          ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600'
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                      }
                    `}
                    placeholder="your.email@example.com"
                    aria-label="Your email address"
                    aria-invalid={errors.email ? 'true' : 'false'}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p
                      id="email-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-neutral-700 dark:text-neutral-300 mb-2"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className={`
                      w-full px-4 py-3 rounded-lg border resize-none
                      text-base text-neutral-900 dark:text-neutral-100
                      focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent
                      transition-all duration-200
                      ${
                        errors.message
                          ? 'border-red-300 bg-red-50 dark:bg-red-900/20 dark:border-red-600'
                          : 'border-neutral-300 dark:border-neutral-600 bg-white dark:bg-neutral-800'
                      }
                    `}
                    placeholder="Your message..."
                    aria-label="Your message"
                    aria-invalid={errors.message ? 'true' : 'false'}
                    aria-describedby={errors.message ? 'message-error' : undefined}
                  />
                  {errors.message && (
                    <p
                      id="message-error"
                      className="mt-2 text-sm text-red-600"
                      role="alert"
                    >
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full px-6 py-3 rounded-lg
                    text-base font-medium text-white
                    bg-primary-600 hover:bg-primary-700
                    focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                    transition-all duration-200
                    disabled:opacity-50 disabled:cursor-not-allowed
                  `}
                  aria-label="Submit contact form"
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>

                {/* Status Messages */}
                {submitStatus === 'success' && (
                  <div
                    className="p-4 rounded-lg bg-green-50 border border-green-200 text-green-800 text-sm"
                    role="alert"
                  >
                    Message sent successfully! I'll get back to you soon.
                  </div>
                )}
                {submitStatus === 'error' && (
                  <div
                    className="p-4 rounded-lg bg-red-50 border border-red-200 text-red-800 text-sm"
                    role="alert"
                  >
                    Something went wrong. Please try again or use the contact links below.
                  </div>
                )}
              </form>
            </div>

            {/* Contact Links */}
            <div>
              <h3 className="text-xl md:text-2xl font-semibold text-neutral-900 dark:text-white mb-6">
                Other Ways to Reach Me
              </h3>
              <div className="space-y-4">
                {links.map((link) => {
                  const isExternal = link.isExternal ?? false
                  const isDownload = link.isDownload ?? false

                  return (
                    <a
                      key={link.id}
                      href={link.href}
                      target="_blank"
                      className={`
                        group flex items-center gap-3
                        px-6 py-4
                        bg-white dark:bg-neutral-800 border-2 border-neutral-200 dark:border-neutral-700 rounded-lg
                        text-base font-medium text-neutral-700 dark:text-neutral-300
                        hover:border-primary-600 dark:hover:border-primary-500 hover:text-primary-600 dark:hover:text-primary-400
                        transition-all duration-200
                        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
                      `}
                      aria-label={link.ariaLabel}
                      {...(isExternal && {
                        target: '_blank',
                        rel: 'noopener noreferrer',
                      })}
                      {...(isDownload && {
                        download: true,
                      })}
                    >
                      <span className="text-primary-600 group-hover:text-primary-700 transition-colors">
                        {getIcon(link.icon)}
                      </span>
                      <span className="flex-grow">{link.label}</span>
                      {isExternal && (
                        <svg
                          className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity"
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
        </div>
      </Container>
    </section>
  )
}

