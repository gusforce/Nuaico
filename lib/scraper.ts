import Parser from 'rss-parser'

export interface RawArticle {
  title: string
  link: string
  excerpt: string
  content: string
  pubDate: string
  sourceDomain: string
  imageUrl: string
}

interface FeedSource {
  url: string
  source: string
}

const RSS_FEEDS: FeedSource[] = [
  { url: 'https://techcrunch.com/tag/artificial-intelligence/feed/', source: 'techcrunch.com' },
  { url: 'https://www.technologyreview.com/feed/', source: 'technologyreview.com' },
  { url: 'https://www.wired.com/feed/tag/ai/latest/rss', source: 'wired.com' },
  { url: 'https://feeds.arstechnica.com/arstechnica/technology-lab', source: 'arstechnica.com' },
  { url: 'https://www.theverge.com/rss/ai-artificial-intelligence/index.xml', source: 'theverge.com' },
  { url: 'https://venturebeat.com/category/ai/feed/', source: 'venturebeat.com' },
  { url: 'https://www.reuters.com/technology/rss', source: 'reuters.com' },
]

const AI_KEYWORDS = [
  'artificial intelligence', 'ai ', ' ai', 'machine learning', 'deep learning',
  'neural network', 'llm', 'large language model', 'chatgpt', 'openai',
  'anthropic', 'claude', 'generative ai', 'gpt', 'transformer',
  'automation', 'computer vision', 'nlp', 'natural language',
]

const parser = new Parser({
  customFields: {
    item: [
      ['media:content', 'mediaContent'],
      ['media:thumbnail', 'mediaThumbnail'],
    ],
  },
})

function isAIRelevant(title: string, description: string): boolean {
  const text = `${title} ${description}`.toLowerCase()
  return AI_KEYWORDS.some(keyword => text.includes(keyword))
}

export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .slice(0, 80)
    .replace(/-$/, '')
}

function extractImageFromRSS(item: Record<string, unknown>): string | null {
  // Check media:content
  const mediaContent = item.mediaContent as Record<string, unknown> | undefined
  if (mediaContent) {
    const attrs = mediaContent['$'] as Record<string, string> | undefined
    if (attrs?.url) return attrs.url
  }

  // Check enclosure
  const enclosure = item.enclosure as Record<string, string> | undefined
  if (enclosure?.url && enclosure.type?.startsWith('image/')) return enclosure.url

  // Check media:thumbnail
  const mediaThumbnail = item.mediaThumbnail as Record<string, unknown> | undefined
  if (mediaThumbnail) {
    const attrs = mediaThumbnail['$'] as Record<string, string> | undefined
    if (attrs?.url) return attrs.url
  }

  return null
}

async function extractOGImage(url: string): Promise<string | null> {
  try {
    const response = await fetch(url, {
      signal: AbortSignal.timeout(5000),
      headers: { 'User-Agent': 'Nuaico-Bot/1.0' },
    })
    const html = await response.text()
    const match = html.match(/<meta[^>]*property=["']og:image["'][^>]*content=["']([^"']+)["']/)
      || html.match(/<meta[^>]*content=["']([^"']+)["'][^>]*property=["']og:image["']/)
    return match?.[1] || null
  } catch {
    return null
  }
}

async function extractArticleImage(item: Record<string, unknown>, link: string): Promise<string> {
  // Layer 1: RSS media fields
  const rssImage = extractImageFromRSS(item)
  if (rssImage) return rssImage

  // Layer 2: Open Graph image from source URL
  const ogImage = await extractOGImage(link)
  if (ogImage) return ogImage

  // Layer 3: Placeholder fallback
  return '/placeholder.svg?height=400&width=800'
}

export async function scrapeOneFeed(feedUrl: string, source: string): Promise<RawArticle[]> {
  try {
    const feed = await parser.parseURL(feedUrl)
    const articles: RawArticle[] = []

    for (const item of feed.items) {
      const title = item.title?.trim()
      const link = item.link?.trim()
      if (!title || !link) continue

      const description = item.contentSnippet || item.content || ''

      // Filter for AI-relevant content on broader feeds
      if (['arstechnica.com', 'reuters.com'].includes(source)) {
        if (!isAIRelevant(title, description)) continue
      }

      const imageUrl = await extractArticleImage(item as unknown as Record<string, unknown>, link)

      articles.push({
        title,
        link,
        excerpt: (item.contentSnippet || '').slice(0, 300),
        content: item.content || '',
        pubDate: item.pubDate || new Date().toISOString(),
        sourceDomain: source,
        imageUrl,
      })
    }

    return articles
  } catch (error) {
    console.error(`Failed to scrape ${source}:`, error)
    return []
  }
}

export async function scrapeAllFeeds(): Promise<RawArticle[]> {
  const results = await Promise.allSettled(
    RSS_FEEDS.map(feed => scrapeOneFeed(feed.url, feed.source))
  )

  const articles: RawArticle[] = []
  for (const result of results) {
    if (result.status === 'fulfilled') {
      articles.push(...result.value)
    }
  }

  return articles
}
