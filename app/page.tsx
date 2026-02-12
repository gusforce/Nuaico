import { getAllArticles, getFeaturedArticles } from "@/lib/db"
import HomePageContent from "@/components/home-page-content"

export const revalidate = 300 // ISR: revalidate every 5 minutes

export default async function Home() {
  const [articles, featuredArticles] = await Promise.all([
    getAllArticles(),
    getFeaturedArticles(),
  ])

  return <HomePageContent articles={articles} featuredArticles={featuredArticles} />
}
