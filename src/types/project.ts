export interface TechStack {
  languages?: string[]
  frameworks?: string[]
  databases?: string[]
  tools?: string[]
  services?: string[]
}

export interface Project {
  id: string
  title: string
  type: 'Full-Stack' | 'Backend' | 'Frontend'
  image?: string
  techStack: TechStack
  links?: {
    github?: string
    live?: string
    demo?: string
  }
}

