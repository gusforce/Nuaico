import { supabaseAdmin } from './supabase'
import {
  ALL_ARTICLES,
  getArticleBySlug as staticGetBySlug,
  getArticlesBySector as staticGetBySector,
  getTrendingArticles as staticGetTrending,
  featuredNews,
} from './data'
import type { Article } from './types'

// Transform snake_case DB row to camelCase Article
function transformRow(row: Record<string, unknown>): Article {
  return {
    id: String(row.id),
    title: row.title as string,
    slug: row.slug as string,
    excerpt: row.excerpt as string,
    content: (row.content as string) || '',
    imageUrl: (row.image_url as string) || '/placeholder.svg?height=400&width=800',
    category: (row.category as string) || '',
    author: (row.author as string) || 'Nuaico AI',
    date: row.date as string,
    sector: row.sector as Article['sector'],
    sourceDomain: row.source_domain as string | undefined,
    sourceUrl: row.source_url as string | undefined,
    readTime: row.read_time as string | undefined,
    aiSummary: row.ai_summary as string[] | undefined,
    aiOpinion: row.ai_opinion as Article['aiOpinion'],
    impactScore: row.impact_score as number | undefined,
    tags: row.tags as string[] | undefined,
    whyPicked: row.why_picked as string | undefined,
    featured: row.featured as boolean | undefined,
  }
}

// Transform camelCase Article to snake_case DB row
function toRow(article: Partial<Article>): Record<string, unknown> {
  const row: Record<string, unknown> = {}
  if (article.slug !== undefined) row.slug = article.slug
  if (article.title !== undefined) row.title = article.title
  if (article.excerpt !== undefined) row.excerpt = article.excerpt
  if (article.content !== undefined) row.content = article.content
  if (article.imageUrl !== undefined) row.image_url = article.imageUrl
  if (article.category !== undefined) row.category = article.category
  if (article.author !== undefined) row.author = article.author
  if (article.date !== undefined) row.date = article.date
  if (article.sector !== undefined) row.sector = article.sector
  if (article.sourceDomain !== undefined) row.source_domain = article.sourceDomain
  if (article.sourceUrl !== undefined) row.source_url = article.sourceUrl
  if (article.readTime !== undefined) row.read_time = article.readTime
  if (article.impactScore !== undefined) row.impact_score = article.impactScore
  if (article.tags !== undefined) row.tags = article.tags
  if (article.featured !== undefined) row.featured = article.featured
  if (article.aiSummary !== undefined) row.ai_summary = article.aiSummary
  if (article.aiOpinion !== undefined) row.ai_opinion = article.aiOpinion
  if (article.whyPicked !== undefined) row.why_picked = article.whyPicked
  return row
}

export async function getAllArticles(): Promise<Article[]> {
  if (!supabaseAdmin) return ALL_ARTICLES
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .order('date', { ascending: false })
    if (error) throw error
    return data.map(transformRow)
  } catch {
    return ALL_ARTICLES
  }
}

export async function getArticleBySlug(slug: string): Promise<Article | undefined> {
  if (!supabaseAdmin) return staticGetBySlug(slug)
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('slug', slug)
      .single()
    if (error) throw error
    return transformRow(data)
  } catch {
    return staticGetBySlug(slug)
  }
}

export async function getArticlesBySector(sector: string): Promise<Article[]> {
  if (!supabaseAdmin) return staticGetBySector(sector)
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('sector', sector)
      .order('date', { ascending: false })
    if (error) throw error
    return data.map(transformRow)
  } catch {
    return staticGetBySector(sector)
  }
}

export async function getTrendingArticles(): Promise<Article[]> {
  if (!supabaseAdmin) return staticGetTrending()
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .gt('impact_score', 75)
      .order('impact_score', { ascending: false })
    if (error) throw error
    return data.map(transformRow)
  } catch {
    return staticGetTrending()
  }
}

export async function getFeaturedArticles(): Promise<Article[]> {
  if (!supabaseAdmin) return featuredNews
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('*')
      .eq('featured', true)
      .order('date', { ascending: false })
    if (error) throw error
    return data.map(transformRow)
  } catch {
    return featuredNews
  }
}

export async function insertArticle(article: Partial<Article>): Promise<void> {
  if (!supabaseAdmin) return
  const row = toRow(article)
  const { error } = await supabaseAdmin.from('articles').insert(row)
  if (error) throw error
}

export async function articleExistsBySourceUrl(sourceUrl: string): Promise<boolean> {
  if (!supabaseAdmin) return false
  try {
    const { data, error } = await supabaseAdmin
      .from('articles')
      .select('id')
      .eq('source_url', sourceUrl)
      .limit(1)
    if (error) throw error
    return (data?.length ?? 0) > 0
  } catch {
    return false
  }
}

export async function insertNewsletterSubscriber(
  email: string
): Promise<{ success: boolean; error?: string }> {
  if (!supabaseAdmin) {
    return { success: true } // graceful fallback when DB not configured
  }
  try {
    const { error } = await supabaseAdmin
      .from('newsletter_subscribers')
      .insert({ email })
    if (error) {
      if (error.code === '23505') {
        return { success: false, error: 'Already subscribed' }
      }
      throw error
    }
    return { success: true }
  } catch {
    return { success: false, error: 'Failed to subscribe' }
  }
}
