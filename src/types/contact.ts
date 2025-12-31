export interface ContactLink {
  id: string
  label: string
  href: string
  icon: 'email' | 'github' | 'linkedin' | 'resume'
  ariaLabel: string
  isExternal?: boolean
  isDownload?: boolean
}

