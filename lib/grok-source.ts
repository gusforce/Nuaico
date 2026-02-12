import type { ProcessedArticle } from './ai-processor'

const XAI_API_URL = 'https://api.x.ai/v1/chat/completions'

export async function getTrendingAITopics(): Promise<string[]> {
  const apiKey = process.env.XAI_API_KEY
  if (!apiKey) return []

  try {
    const response = await fetch(XAI_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'grok-3',
        messages: [
          {
            role: 'system',
            content: 'You identify trending AI topics from X/Twitter discourse. Return a JSON array of 10 trending AI topic strings. Return ONLY the JSON array, no explanation.',
          },
          {
            role: 'user',
            content: 'What are the top trending AI topics being discussed on X/Twitter right now? Focus on topics with real industry impact across Finance, Healthcare, Technology, Energy, and Industry sectors.',
          },
        ],
        max_tokens: 512,
      }),
      signal: AbortSignal.timeout(15000),
    })

    if (!response.ok) {
      console.error(`Grok API error: ${response.status}`)
      return []
    }

    const data = await response.json()
    const content = data.choices?.[0]?.message?.content || '[]'
    const topics = JSON.parse(content)
    return Array.isArray(topics) ? topics : []
  } catch (error) {
    console.error('Grok trending topics error:', error)
    return []
  }
}

export function enhanceWithTrending(
  articles: ProcessedArticle[],
  trending: string[]
): ProcessedArticle[] {
  if (trending.length === 0) return articles

  const trendingLower = trending.map(t => t.toLowerCase())

  return articles.map(article => {
    const titleLower = article.title.toLowerCase()
    const tagsLower = article.tags.map(t => t.toLowerCase())
    const allText = `${titleLower} ${tagsLower.join(' ')} ${article.excerpt.toLowerCase()}`

    const matchCount = trendingLower.filter(topic =>
      allText.includes(topic.toLowerCase())
    ).length

    if (matchCount > 0) {
      const boost = Math.min(matchCount * 5, 15)
      return {
        ...article,
        impactScore: Math.min(article.impactScore + boost, 100),
      }
    }

    return article
  })
}
