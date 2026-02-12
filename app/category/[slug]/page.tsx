import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { SECTORS } from "@/lib/data"
import { getAllArticles, getArticlesBySector } from "@/lib/db"
import CategoryPageContent from "@/components/category-page-content"
import type { Sector } from "@/lib/types"

export const revalidate = 300

interface Props {
  params: Promise<{ slug: string }>
}

function slugToSector(slug: string): Sector | 'all' | null {
  if (slug === 'all') return 'all'
  const match = SECTORS.find(s => s.toLowerCase().replace(' ', '-') === slug.toLowerCase())
  return match || null
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const sector = slugToSector(slug)
  if (!sector) return {}
  const sectorName = sector === 'all' ? 'All News' : sector

  return {
    title: `${sectorName} - AI News & Analysis`,
    description: `Latest AI news and analysis for the ${sectorName} sector. Track AI adoption, regulation, and disruption.`,
    openGraph: {
      title: `${sectorName} - Nuaico`,
      description: `AI news and analysis for ${sectorName}.`,
    },
  }
}

export async function generateStaticParams() {
  return [
    ...SECTORS.map(s => ({ slug: s.toLowerCase().replace(' ', '-') })),
    { slug: 'all' },
  ]
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const sectorOrAll = slugToSector(slug)
  if (!sectorOrAll) notFound()

  const articles = sectorOrAll === 'all'
    ? await getAllArticles()
    : await getArticlesBySector(sectorOrAll)
  const sectorName = sectorOrAll === 'all' ? 'All News' : sectorOrAll

  return <CategoryPageContent articles={articles} sectorOrAll={sectorOrAll} sectorName={sectorName} />
}
