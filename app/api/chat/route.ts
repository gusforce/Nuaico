import Anthropic from '@anthropic-ai/sdk'
import { getArticleBySlug, ALL_ARTICLES } from '@/lib/data'

const anthropic = new Anthropic()

const NU_PERSONA = `You are Nu, Nuaico's AI news analysis assistant. You help users understand AI's impact across 6 industry sectors: Finance, Healthcare, Technology, Energy, Government, Industry. Be concise, informative, and reference specific articles when relevant. Format responses with markdown (bold, bullets).`

function buildSystemPrompt(articleSlug?: string): string {
  let system = NU_PERSONA

  // If viewing a specific article, include its full data
  if (articleSlug) {
    const article = getArticleBySlug(articleSlug)
    if (article) {
      system += `\n\nThe user is currently reading this article:\n`
      system += `Title: ${article.title}\n`
      system += `Sector: ${article.sector}\n`
      system += `Excerpt: ${article.excerpt}\n`
      if (article.impactScore) system += `Impact Score: ${article.impactScore}/100\n`
      if (article.aiSummary) system += `AI Summary:\n${article.aiSummary.map(s => `- ${s}`).join('\n')}\n`
      if (article.aiOpinion) {
        system += `AI Opinion:\n`
        system += `- Change: ${article.aiOpinion.change}\n`
        system += `- Beneficiaries: ${article.aiOpinion.beneficiaries}\n`
        system += `- Risks: ${article.aiOpinion.risks.join('; ')}\n`
        system += `- Confidence: ${article.aiOpinion.confidenceLevel} (${article.aiOpinion.confidenceReason})\n`
        system += `- Takeaways: ${article.aiOpinion.takeaways.join('; ')}\n`
      }
    }
  }

  // Include compact list of all articles as general knowledge
  system += `\n\nYou have knowledge of the following ${ALL_ARTICLES.length} articles on Nuaico:\n`
  ALL_ARTICLES.forEach(a => {
    system += `- "${a.title}" [${a.sector}]${a.impactScore ? ` Impact:${a.impactScore}` : ''} slug:${a.slug}\n`
  })

  return system
}

export async function POST(request: Request) {
  try {
    const { message, history, articleSlug } = await request.json() as {
      message: string
      history: { role: 'user' | 'assistant'; content: string }[]
      articleSlug?: string
    }

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Message is required' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const systemPrompt = buildSystemPrompt(articleSlug)

    const messages: { role: 'user' | 'assistant'; content: string }[] = [
      ...(history || []),
      { role: 'user', content: message },
    ]

    const stream = anthropic.messages.stream({
      model: 'claude-sonnet-4-5-20250929',
      max_tokens: 1024,
      system: systemPrompt,
      messages,
    })

    const readableStream = new ReadableStream({
      async start(controller) {
        try {
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(new TextEncoder().encode(event.delta.text))
            }
          }
          controller.close()
        } catch (err) {
          controller.error(err)
        }
      },
    })

    return new Response(readableStream, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('Chat API error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}
