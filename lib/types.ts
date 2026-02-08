export type Sector =
  | 'Finance'
  | 'Healthcare'
  | 'Energy'
  | 'Manufacturing'
  | 'Retail'
  | 'Media'
  | 'Government'
  | 'Education'
  | 'Transportation'
  | 'Cybersecurity'
  | 'Real Estate'
  | 'Agriculture'

export interface AIOpinion {
  change: string
  beneficiaries: string
  risks: string[]
  confidenceLevel: 'Low' | 'Medium' | 'High'
  confidenceReason: string
  takeaways: string[]
}

export interface Article {
  id: string
  title: string
  slug: string
  excerpt: string
  content: string
  imageUrl: string
  category: string
  author: string
  date: string
  sector: Sector
  sourceDomain?: string
  sourceUrl?: string
  readTime?: string
  aiSummary?: string[]
  aiOpinion?: AIOpinion
  impactScore?: number
  tags?: string[]
  whyPicked?: string
  featured?: boolean
}

export interface SectorNewsData {
  [sector: string]: Article[]
}
