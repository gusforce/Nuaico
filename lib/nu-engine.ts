import { ALL_ARTICLES, getArticlesBySector, getTrendingArticles, getArticleBySlug, SECTORS } from '@/lib/data'
import type { Article } from '@/lib/types'

export interface NuResponse {
  text: string
  articles?: Article[]
  suggestions?: string[]
}

function matchesAny(input: string, keywords: string[]): boolean {
  const lower = input.toLowerCase()
  return keywords.some(k => lower.includes(k))
}

function getTopByImpact(articles: Article[], count: number): Article[] {
  return [...articles]
    .sort((a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0))
    .slice(0, count)
}

function formatArticleSummary(article: Article): string {
  const bullets = article.aiSummary
    ? article.aiSummary.map(s => `  - ${s}`).join('\n')
    : `  - ${article.excerpt}`
  return `**${article.title}** (${article.sector})\n${bullets}`
}

function findSectorFromMessage(message: string): string | undefined {
  const lower = message.toLowerCase()
  return SECTORS.find(s => lower.includes(s.toLowerCase()))
}

function searchArticles(query: string): Article[] {
  const lower = query.toLowerCase()
  return ALL_ARTICLES.filter(a =>
    a.title.toLowerCase().includes(lower) ||
    a.excerpt.toLowerCase().includes(lower) ||
    (a.tags ?? []).some(t => t.toLowerCase().includes(lower)) ||
    a.category.toLowerCase().includes(lower)
  )
}

export function generateResponse(userMessage: string, currentArticleSlug?: string): NuResponse {
  const msg = userMessage.trim().toLowerCase()

  // Greeting
  if (matchesAny(msg, ['hi', 'hello', 'hey', 'greetings', 'sup', 'yo', 'howdy'])) {
    return {
      text: "Hey! I'm Nu, your AI news companion. I can summarize articles, find trending stories, and help you explore AI news across 12 sectors. What would you like to know?",
      suggestions: [
        "What's trending right now?",
        "Recommend me something to read",
        "What's happening in Healthcare?"
      ]
    }
  }

  // Help
  if (matchesAny(msg, ['help', 'what can you do', 'commands', 'how do you work', 'capabilities'])) {
    return {
      text: "Here's what I can help with:\n\n- **Summarize** the article you're reading\n- **Find trending** stories (high-impact news)\n- **Explore sectors** like Finance, Healthcare, Energy, and more\n- **Get recommendations** based on impact scores\n- **Analyze impact** of specific topics\n\nJust ask naturally!",
      suggestions: [
        "What's trending?",
        "Tell me about Cybersecurity news",
        "What should I read?"
      ]
    }
  }

  // Summarize current article
  if (currentArticleSlug && matchesAny(msg, ['summarize', 'summary', 'what is this', 'tldr', 'tl;dr', 'about this', 'this article', 'explain this'])) {
    const article = getArticleBySlug(currentArticleSlug)
    if (article) {
      let text = `Here's a summary of **${article.title}**:\n\n`
      if (article.aiSummary && article.aiSummary.length > 0) {
        text += article.aiSummary.map(s => `- ${s}`).join('\n')
      } else {
        text += article.excerpt
      }
      if (article.aiOpinion?.takeaways && article.aiOpinion.takeaways.length > 0) {
        text += '\n\n**Key Takeaways:**\n'
        text += article.aiOpinion.takeaways.map(t => `- ${t}`).join('\n')
      }
      return {
        text,
        suggestions: [
          "What's the impact of this?",
          `More ${article.sector} news`,
          "What's trending?"
        ]
      }
    }
  }

  // Trending
  if (matchesAny(msg, ['trending', 'top stories', 'hot news', 'popular', 'biggest stories', 'top news'])) {
    const trending = getTrendingArticles()
    const top = getTopByImpact(trending, 3)
    let text = "Here are the top trending stories:\n\n"
    top.forEach((a, i) => {
      text += `**${i + 1}. ${a.title}**\nImpact Score: ${a.impactScore} | ${a.sector}\n\n`
    })
    return {
      text,
      articles: top,
      suggestions: [
        "Tell me more about the first one",
        "Any Cybersecurity news?",
        "Recommend something to read"
      ]
    }
  }

  // Recommendations
  if (matchesAny(msg, ['recommend', 'what should i read', 'suggest', 'suggestion', 'read next', 'interesting'])) {
    const top = getTopByImpact(ALL_ARTICLES, 3)
    let text = "Based on impact scores, I'd recommend these:\n\n"
    top.forEach((a, i) => {
      text += `**${i + 1}. ${a.title}**\n${a.excerpt.slice(0, 100)}...\n\n`
    })
    return {
      text,
      articles: top,
      suggestions: [
        "Summarize the first one",
        "What's trending?",
        "Show me Healthcare news"
      ]
    }
  }

  // Sector questions
  const sector = findSectorFromMessage(msg)
  if (sector && matchesAny(msg, ['news', 'happening', 'latest', 'update', 'tell me about', 'show me', 'what', 'how', sector.toLowerCase()])) {
    const sectorArticles = getArticlesBySector(sector)
    const top = sectorArticles.slice(0, 3)
    if (top.length === 0) {
      return {
        text: `I don't have any ${sector} stories right now. Try another sector!`,
        suggestions: [
          "What's trending?",
          "Show me Finance news",
          "What sectors do you cover?"
        ]
      }
    }
    let text = `Here's what's happening in **${sector}**:\n\n`
    top.forEach(a => {
      text += formatArticleSummary(a) + '\n\n'
    })
    return {
      text,
      articles: top,
      suggestions: [
        `What's the impact in ${sector}?`,
        "What's trending?",
        "Recommend me something"
      ]
    }
  }

  // Impact/analysis
  if (matchesAny(msg, ['impact', 'analysis', 'effect', 'change', 'consequence'])) {
    // Try to find matching articles
    const words = msg.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3 && !['impact', 'what', 'the', 'about', 'analysis', 'effect'].includes(w))
    let matches: Article[] = []
    for (const word of words) {
      matches = [...matches, ...searchArticles(word)]
    }
    // Deduplicate
    const seen = new Set<string>()
    matches = matches.filter(a => {
      if (seen.has(a.id)) return false
      seen.add(a.id)
      return true
    })

    if (matches.length > 0) {
      const top = matches.slice(0, 3)
      let text = "Here's my analysis:\n\n"
      top.forEach(a => {
        text += `**${a.title}**\n`
        if (a.aiOpinion?.change) {
          text += `${a.aiOpinion.change}\n`
        }
        if (a.impactScore) {
          text += `Impact Score: ${a.impactScore}/100\n`
        }
        text += '\n'
      })
      return {
        text,
        articles: top,
        suggestions: [
          "What's trending?",
          "Recommend me something",
          "Tell me about Healthcare"
        ]
      }
    }

    // If current article context
    if (currentArticleSlug) {
      const article = getArticleBySlug(currentArticleSlug)
      if (article?.aiOpinion) {
        let text = `**Impact Analysis for "${article.title}":**\n\n`
        text += `${article.aiOpinion.change}\n\n`
        text += `**Impact Score:** ${article.impactScore}/100\n`
        text += `**Confidence:** ${article.aiOpinion.confidenceLevel}\n`
        return {
          text,
          suggestions: [
            "Summarize this article",
            `More ${article.sector} news`,
            "What's trending?"
          ]
        }
      }
    }
  }

  // Search by keyword as fallback
  const words = msg.replace(/[^a-z0-9\s]/g, '').split(/\s+/).filter(w => w.length > 3)
  for (const word of words) {
    const results = searchArticles(word)
    if (results.length > 0) {
      const top = results.slice(0, 3)
      let text = `I found some articles related to "${word}":\n\n`
      top.forEach((a, i) => {
        text += `**${i + 1}. ${a.title}**\n${a.excerpt.slice(0, 80)}...\n\n`
      })
      return {
        text,
        articles: top,
        suggestions: [
          "Tell me more about the first one",
          "What's trending?",
          "What can you do?"
        ]
      }
    }
  }

  // Default
  return {
    text: "I'm not sure I understood that. Here are some things you can ask me:\n\n- \"What's trending?\"\n- \"Summarize this article\"\n- \"What's happening in Finance?\"\n- \"Recommend me something to read\"\n- \"What's the impact of AI in Healthcare?\"",
    suggestions: [
      "What's trending?",
      "Recommend me something",
      "What can you do?"
    ]
  }
}
