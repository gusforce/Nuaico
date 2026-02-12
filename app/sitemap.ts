import type { MetadataRoute } from "next"
import { SECTORS } from "@/lib/data"
import { getAllArticles } from "@/lib/db"

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://nuaico.com"
  const articles = await getAllArticles()

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ]

  const articlePages: MetadataRoute.Sitemap = articles.map(article => ({
    url: `${baseUrl}/news/${article.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.8,
  }))

  const categoryPages: MetadataRoute.Sitemap = SECTORS.map(sector => ({
    url: `${baseUrl}/category/${sector.toLowerCase().replace(' ', '-')}`,
    lastModified: new Date(),
    changeFrequency: "daily",
    priority: 0.7,
  }))

  return [...staticPages, ...articlePages, ...categoryPages]
}
