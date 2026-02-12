import { NextResponse } from 'next/server'
import {
  getAllArticles,
  getArticleBySlug,
  getArticlesBySector,
  getTrendingArticles,
  getFeaturedArticles,
} from '@/lib/db'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const slug = searchParams.get('slug')
    const sector = searchParams.get('sector')
    const trending = searchParams.get('trending')
    const featured = searchParams.get('featured')

    if (slug) {
      const article = await getArticleBySlug(slug)
      if (!article) {
        return NextResponse.json({ error: 'Article not found' }, { status: 404 })
      }
      return NextResponse.json(article)
    }

    if (trending === 'true') {
      const articles = await getTrendingArticles()
      return NextResponse.json(articles)
    }

    if (featured === 'true') {
      const articles = await getFeaturedArticles()
      return NextResponse.json(articles)
    }

    if (sector) {
      const articles = await getArticlesBySector(sector)
      return NextResponse.json(articles)
    }

    const articles = await getAllArticles()
    return NextResponse.json(articles)
  } catch (error) {
    console.error('Articles API error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
