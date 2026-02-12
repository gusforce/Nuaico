import Anthropic from '@anthropic-ai/sdk'
import { z } from 'zod'
import type { RawArticle } from './scraper'
import { generateSlug } from './scraper'
import type { Sector, AIOpinion } from './types'

const anthropic = new Anthropic()

export interface ProcessedArticle {
  slug: string
  title: string
  excerpt: string
  content: string
  imageUrl: string
  sourceDomain: string
  sourceUrl: string
  pubDate: string
  sector: Sector
  category: string
  aiSummary: string[]
  aiOpinion: AIOpinion
  impactScore: number
  tags: string[]
  whyPicked: string
  readTime: string
}

const analysisSchema = z.object({
  sector: z.enum(['Finance', 'Healthcare', 'Technology', 'Energy', 'Industry']),
  category: z.string(),
  aiSummary: z.array(z.string()).length(3),
  aiOpinion: z.object({
    change: z.string(),
    beneficiaries: z.string(),
    risks: z.array(z.string()),
    confidenceLevel: z.enum(['Low', 'Medium', 'High']),
    confidenceReason: z.string(),
    takeaways: z.array(z.string()),
  }),
  impactScore: z.number().min(0).max(100),
  tags: z.array(z.string()),
  whyPicked: z.string(),
  readTime: z.string(),
})

const ANALYSIS_SYSTEM_PROMPT = `You are an AI news analyst for Nuaico. Analyze the provided article and return a JSON object with the following fields:

- sector: One of "Finance", "Healthcare", "Technology", "Energy", "Industry". Choose the MOST relevant sector.
- category: A sub-category within the sector (e.g., "Banking", "Biotech", "Cybersecurity", "Renewable Energy", "Education Policy", "Manufacturing")
- aiSummary: Array of exactly 3 concise bullet points summarizing the key facts
- aiOpinion: Object with:
  - change: One sentence describing the structural change this represents
  - beneficiaries: One sentence identifying who benefits
  - risks: Array of 2-3 risk factors
  - confidenceLevel: "Low", "Medium", or "High" based on source quality and evidence strength
  - confidenceReason: One sentence explaining the confidence assessment
  - takeaways: Array of 2-3 actionable insights
- impactScore: Integer 0-100 based on economic/operational significance (80+ = major disruption, 50-79 = notable, below 50 = incremental)
- tags: Array of 3-5 lowercase keyword tags
- whyPicked: One sentence explaining why this article matters
- readTime: Estimated read time (e.g., "3 min read")

Return ONLY valid JSON, no markdown wrapping, no explanation.`

export async function processArticle(raw: RawArticle): Promise<ProcessedArticle> {
  const userPrompt = `Title: ${raw.title}\nSource: ${raw.sourceDomain}\nDate: ${raw.pubDate}\n\nContent:\n${raw.excerpt}\n\n${raw.content.slice(0, 2000)}`

  const response = await anthropic.messages.create({
    model: 'claude-sonnet-4-5-20250929',
    max_tokens: 1024,
    system: ANALYSIS_SYSTEM_PROMPT,
    messages: [{ role: 'user', content: userPrompt }],
  })

  const text = response.content[0].type === 'text' ? response.content[0].text : ''
  const parsed = JSON.parse(text)
  const validated = analysisSchema.parse(parsed)

  return {
    slug: generateSlug(raw.title),
    title: raw.title,
    excerpt: raw.excerpt,
    content: raw.content,
    imageUrl: raw.imageUrl,
    sourceDomain: raw.sourceDomain,
    sourceUrl: raw.link,
    pubDate: raw.pubDate,
    ...validated,
  }
}

export async function processBatch(articles: RawArticle[]): Promise<ProcessedArticle[]> {
  const results: ProcessedArticle[] = []
  for (const article of articles) {
    try {
      const processed = await processArticle(article)
      results.push(processed)
    } catch (error) {
      console.error(`Failed to process article: ${article.title}`, error)
    }
  }
  return results
}
