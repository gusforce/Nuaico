import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { getArticleBySlug, getAllArticles, getArticlesBySector } from "@/lib/db"
import ArticlePageContent from "@/components/article-page-content"

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) return {}

  return {
    title: article.title,
    description: article.excerpt,
    openGraph: {
      title: article.title,
      description: article.excerpt,
      type: "article",
      publishedTime: article.date,
      section: article.sector,
      images: article.imageUrl ? [{ url: article.imageUrl }] : [],
      tags: article.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: article.title,
      description: article.excerpt,
      images: article.imageUrl ? [article.imageUrl] : [],
    },
  }
}

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({ slug: article.slug }))
}

export default async function NewsArticlePage({ params }: Props) {
  const { slug } = await params
  const article = await getArticleBySlug(slug)
  if (!article) notFound()

  // Get related articles from the same sector
  const sectorArticles = await getArticlesBySector(article.sector)
  const relatedArticles = sectorArticles.filter(a => a.id !== article.id).slice(0, 2)

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "NewsArticle",
            headline: article.title,
            description: article.excerpt,
            image: article.imageUrl,
            datePublished: article.date,
            author: { "@type": "Person", name: article.author },
            publisher: {
              "@type": "Organization",
              name: "Nuaico",
            },
            articleSection: article.sector,
          }),
        }}
      />
      <ArticlePageContent article={article} relatedArticles={relatedArticles} />
    </>
  )
}
