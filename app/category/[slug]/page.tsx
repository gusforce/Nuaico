'use client'

import { useParams } from "next/navigation"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ALL_ARTICLES, SECTORS } from "@/lib/data"
import { SectorIcons, Icons } from "@/lib/icons"
import { useStyle } from "@/components/style-provider"
import type { Article, Sector } from "@/lib/types"

function slugToSector(slug: string): Sector | 'all' | null {
  if (slug === 'all') return 'all'
  const match = SECTORS.find(s => s.toLowerCase().replace(' ', '-') === slug.toLowerCase())
  return match || null
}

export default function CategoryPage() {
  const params = useParams()
  const slug = params.slug as string
  const { isStudio } = useStyle()

  const sectorOrAll = slugToSector(slug)

  if (!sectorOrAll) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-slate-900">Category not found</h1>
        <Link href="/" className="text-brand-accent mt-4 inline-block">Go home</Link>
      </div>
    )
  }

  const articles = sectorOrAll === 'all'
    ? ALL_ARTICLES
    : ALL_ARTICLES.filter(a => a.sector === sectorOrAll)

  const sectorName = sectorOrAll === 'all' ? 'All News' : sectorOrAll

  if (isStudio && sectorOrAll !== 'all') {
    const sector = sectorOrAll as Sector
    const Icon = SectorIcons[sector]

    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8 border-b border-gray-200 pb-8">
          <div className="flex items-center gap-3 text-slate-500 text-sm mb-4">
            <Link href="/" className="hover:text-slate-900">Home</Link>
            <Icons.ChevronRight size={14} />
            <span className="text-slate-900 font-medium">{sector}</span>
          </div>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white border border-gray-200 rounded-lg shadow-sm text-brand-accent">
                <Icon size={32} />
              </div>
              <div>
                <h1 className="text-3xl font-heading font-bold text-slate-900">{sector}</h1>
                <p className="text-slate-600 mt-1">Tracking AI adoption, regulation, and disruption in {sector.toLowerCase()}.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <div className="lg:col-span-3 space-y-6">
            {articles.length > 0 ? (
              articles.map(article => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <div className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex flex-col md:flex-row mb-4">
                    <div className="md:w-48 h-48 md:h-auto shrink-0 bg-gray-200 overflow-hidden relative">
                      {article.imageUrl && (
                        <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-dark shadow-sm">
                        {article.sector}
                      </div>
                    </div>
                    <div className="p-4 flex flex-col justify-between grow">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          {article.sourceDomain && <span className="text-xs text-gray-500 font-medium">{article.sourceDomain}</span>}
                          <span className="text-xs text-gray-500">{article.date}</span>
                        </div>
                        <h3 className="font-heading font-bold text-slate-900 group-hover:text-brand-accent leading-tight mb-2">{article.title}</h3>
                        <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                      </div>
                      {article.impactScore && (
                        <div className="flex items-center gap-1 text-brand-accent font-bold text-sm mt-3">
                          <Icons.Activity size={16} />
                          <span>{article.impactScore}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
                <Icons.Search className="mx-auto h-12 w-12 text-gray-300 mb-4" />
                <h3 className="text-lg font-medium text-slate-900">No articles found</h3>
                <p className="text-slate-500">Check back later for articles in this sector.</p>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg border border-gray-200 p-5">
              <h3 className="font-bold text-slate-900 mb-4 text-sm uppercase tracking-wide">This Week in {sector}</h3>
              <ul className="space-y-4">
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-slate-600 leading-snug">Regulatory hearing scheduled for upcoming compliance review.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-slate-600 leading-snug">Investment in {sector} AI startups topped $4B this quarter.</p>
                </li>
                <li className="flex gap-3 items-start">
                  <div className="w-1.5 h-1.5 bg-brand-accent rounded-full mt-2 shrink-0" />
                  <p className="text-sm text-slate-600 leading-snug">Major partnership announced between industry leaders.</p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // v0 style category page
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-brand">{sectorName} News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((item) => (
          <Card key={item.id} className="overflow-hidden hover:shadow-md transition-shadow bg-white">
            <div className="relative aspect-video">
              <Image src={item.imageUrl || "/placeholder.svg"} alt={item.title} fill className="object-cover" />
            </div>
            <CardContent className="p-4">
              <Badge variant="outline" className="mb-2 text-brand border-brand-accent">
                {item.category}
              </Badge>
              <h2 className="font-bold text-xl mb-2 line-clamp-2 text-brand">
                <Link href={`/news/${item.slug}`} className="hover:text-brand-accent">
                  {item.title}
                </Link>
              </h2>
              <p className="text-muted-foreground mb-3">{item.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{item.author}</span>
                <span>{item.date}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
