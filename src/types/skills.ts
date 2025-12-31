export interface SkillCategory {
  name: string
  skills: string[]
}

export interface SkillsData {
  languages: SkillCategory
  frameworks: SkillCategory
  databases: SkillCategory
  tools: SkillCategory
  engineeringPractices: SkillCategory
}

