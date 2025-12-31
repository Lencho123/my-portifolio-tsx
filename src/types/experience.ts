export interface Experience {
  id: string
  title: string
  company: string
  location?: string
  type: 'Full-time' | 'Part-time' | 'Internship' | 'Contract' | 'Volunteer'
  startDate: string
  endDate: string | 'Present'
  summary: string
  technologies?: string[]
}

