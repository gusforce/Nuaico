import { NextResponse } from 'next/server'
import { scrapeAllFeeds } from '@/lib/scraper'
import { processBatch } from '@/lib/ai-processor'
import { getTrendingAITopics, enhanceWithTrending } from '@/lib/grok-source'
import { insertArticle, articleExistsBySourceUrl } from '@/lib/db'

export async function GET(request: Request) {
  // Verify cron secret
  const authHeader = request.headers.get('authorization')
  const cronSecret = process.env.CRON_SECRET

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Step 1: Scrape all RSS feeds
    const rawArticles = await scrapeAllFeeds()
    const totalScraped = rawArticles.length

    // Step 2: Deduplicate against existing articles
    const newArticles = []
    for (const raw of rawArticles) {
      const exists = await articleExistsBySourceUrl(raw.link)
      if (!exists) {
        newArticles.push(raw)
      }
    }

    if (newArticles.length === 0) {
      return NextResponse.json({
        added: 0,
        errors: 0,
        total_scraped: totalScraped,
        message: 'No new articles found',
      })
    }

    // Step 3: Process through Claude AI
    const processed = await processBatch(newArticles)

    // Step 4: Enhance with Grok trending data
    const trending = await getTrendingAITopics()
    const enhanced = enhanceWithTrending(processed, trending)

    // Step 5: Insert into database
    let added = 0
    let errors = 0
    for (const article of enhanced) {
      try {
        await insertArticle({
          slug: article.slug,
          title: article.title,
          excerpt: article.excerpt,
          content: article.content,
          imageUrl: article.imageUrl,
          category: article.category,
          author: `${article.sourceDomain} via Nuaico`,
          date: article.pubDate,
          sector: article.sector,
          sourceDomain: article.sourceDomain,
          sourceUrl: article.sourceUrl,
          readTime: article.readTime,
          impactScore: article.impactScore,
          tags: article.tags,
          featured: article.impactScore >= 85,
          aiSummary: article.aiSummary,
          aiOpinion: article.aiOpinion,
          whyPicked: article.whyPicked,
        })
        added++
      } catch (error) {
        console.error(`Failed to insert article: ${article.title}`, error)
        errors++
      }
    }

    return NextResponse.json({
      added,
      errors,
      total_scraped: totalScraped,
      new_found: newArticles.length,
      processed: processed.length,
      trending_topics: trending.length,
    })
  } catch (error) {
    console.error('Scrape pipeline error:', error)
    return NextResponse.json({ error: 'Scrape pipeline failed' }, { status: 500 })
  }
}
