'use client'

import { useState } from "react"

import HeroSlideshow from "@/components/hero-slideshow"
import { SECTORS } from "@/lib/data"
import { SectorIcons, Icons } from "@/lib/icons"
import { useStyle } from "@/components/style-provider"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import type { Article } from "@/lib/types"

interface HomePageContentProps {
  articles: Article[]
  featuredArticles: Article[]
}

export default function HomePageContent({ articles, featuredArticles }: HomePageContentProps) {
  const { isCorp } = useStyle()
  const [selectedSector, setSelectedSector] = useState<string>('All')

  if (isCorp) {
    // Sort all articles by impact score (highest first), treating missing scores as 0
    const sortedByImpact = [...articles].sort((a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0))
    const priorityBriefing = sortedByImpact.slice(0, 3)

    // Calculate per-sector stats for the Sector Intelligence Grid
    const sectorStats = SECTORS.map(sector => {
      const sectorArticles = articles.filter(a => a.sector === sector)
      const topArticle = [...sectorArticles].sort((a, b) => (b.impactScore ?? 0) - (a.impactScore ?? 0))[0]
      const highestImpact = topArticle?.impactScore ?? 0
      return { sector, count: sectorArticles.length, topArticle, highestImpact }
    })

    // Format today's date
    const today = new Date()
    const formattedDate = today.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })

    return (
      <main className="min-h-screen bg-white">
        {/* Executive Summary Header */}
        <header className="border-b border-gray-200 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div>
                <p className="text-sm font-medium uppercase tracking-widest text-slate-400 mb-2">
                  {formattedDate}
                </p>
                <h1 className="text-3xl md:text-4xl font-heading font-bold text-slate-900 tracking-tight">
                  AI Intelligence Briefing
                </h1>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-500">
                <span className="inline-flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full font-medium">
                  <Icons.Activity size={14} className="text-brand-accent" />
                  {articles.length} articles analyzed
                </span>
              </div>
            </div>
          </div>
        </header>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-14">

          {/* Priority Briefing */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Priority Briefing
            </h2>
            <div className="space-y-4">
              {priorityBriefing.map((article, idx) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="block group">
                  <Card className="border-l-4 border-l-brand-accent border-gray-200 hover:shadow-md transition-shadow duration-200">
                    <CardContent className="p-5 sm:p-6">
                      <div className="flex gap-4 sm:gap-6">
                        {/* Rank number */}
                        <div className="shrink-0 flex items-start">
                          <span className="text-3xl sm:text-4xl font-heading font-bold text-brand-accent leading-none">
                            {idx + 1}
                          </span>
                        </div>

                        {/* Content */}
                        <div className="min-w-0 flex-1 space-y-2">
                          <div className="flex flex-wrap items-center gap-2">
                            {article.impactScore != null && (
                              <span className="inline-flex items-center gap-1 bg-brand-accent/10 text-brand-accent text-xs font-bold px-2 py-0.5 rounded">
                                <Icons.Activity size={12} />
                                Impact: {article.impactScore}
                              </span>
                            )}
                            <span className="text-xs font-medium text-slate-400 bg-slate-100 px-2 py-0.5 rounded">
                              {article.sector}
                            </span>
                            {article.aiOpinion && (
                              <span className={`text-xs font-medium px-2 py-0.5 rounded ${
                                article.aiOpinion.confidenceLevel === 'High'
                                  ? 'bg-emerald-50 text-emerald-700'
                                  : article.aiOpinion.confidenceLevel === 'Medium'
                                  ? 'bg-amber-50 text-amber-700'
                                  : 'bg-red-50 text-red-700'
                              }`}>
                                {article.aiOpinion.confidenceLevel} Confidence
                              </span>
                            )}
                          </div>

                          <h3 className="font-heading font-bold text-slate-900 text-lg leading-snug group-hover:text-brand-accent transition-colors">
                            {article.title}
                          </h3>

                          <p className="text-sm text-slate-500 leading-relaxed line-clamp-1">
                            {article.excerpt}
                          </p>

                          {article.sourceDomain && (
                            <p className="text-xs text-slate-400">
                              Source: {article.sourceDomain}
                            </p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Sector Intelligence Grid */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Sector Intelligence
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {sectorStats.map(({ sector, count, topArticle, highestImpact }) => {
                const Icon = SectorIcons[sector]
                return (
                  <Link
                    key={sector}
                    href={`/category/${sector.toLowerCase().replace(' ', '-')}`}
                    className="block group"
                  >
                    <Card className="h-full border-gray-200 hover:shadow-md hover:border-brand-accent/40 transition-all duration-200">
                      <CardContent className="p-5">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-9 h-9 rounded-lg bg-slate-50 border border-gray-200 flex items-center justify-center text-brand-accent">
                              <Icon size={18} />
                            </div>
                            <div>
                              <h3 className="font-heading font-bold text-slate-900 text-sm">{sector}</h3>
                              <p className="text-xs text-slate-400">{count} article{count !== 1 ? 's' : ''}</p>
                            </div>
                          </div>
                          {highestImpact > 0 && (
                            <span className="text-xs font-bold text-brand-accent bg-brand-accent/10 px-2 py-0.5 rounded">
                              {highestImpact}
                            </span>
                          )}
                        </div>
                        {topArticle && (
                          <p className="text-sm text-slate-600 leading-snug line-clamp-1 group-hover:text-brand-accent transition-colors">
                            {topArticle.title}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  </Link>
                )
              })}
            </div>
          </section>

          {/* Full Analysis Feed */}
          <section>
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-6">
              Full Analysis Feed
            </h2>
            <div className="border border-gray-200 rounded-lg overflow-hidden">
              {/* Table header */}
              <div className="hidden sm:grid sm:grid-cols-12 gap-4 bg-slate-50 px-5 py-3 text-xs font-bold uppercase tracking-wider text-slate-400 border-b border-gray-200">
                <div className="col-span-5">Title</div>
                <div className="col-span-2">Sector</div>
                <div className="col-span-2 text-center">Impact</div>
                <div className="col-span-2">Source</div>
                <div className="col-span-1 text-right">Date</div>
              </div>
              {/* Rows */}
              {sortedByImpact.map((article) => (
                <Link key={article.id} href={`/news/${article.slug}`} className="block group">
                  <div className="sm:grid sm:grid-cols-12 gap-4 px-5 py-3.5 border-b border-gray-100 last:border-b-0 hover:bg-slate-50/80 transition-colors duration-150 items-center">
                    <div className="col-span-5">
                      <h3 className="text-sm font-semibold text-slate-800 group-hover:text-brand-accent transition-colors line-clamp-1">
                        {article.title}
                      </h3>
                    </div>
                    <div className="col-span-2 mt-1 sm:mt-0">
                      <span className="text-xs font-medium text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                        {article.sector}
                      </span>
                    </div>
                    <div className="col-span-2 text-center mt-1 sm:mt-0">
                      {article.impactScore ? (
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-accent">
                          <Icons.Activity size={12} />
                          {article.impactScore}
                        </span>
                      ) : (
                        <span className="text-xs text-slate-300">&mdash;</span>
                      )}
                    </div>
                    <div className="col-span-2 mt-1 sm:mt-0">
                      <span className="text-xs text-slate-400">
                        {article.sourceDomain ?? '\u2014'}
                      </span>
                    </div>
                    <div className="col-span-1 text-right mt-1 sm:mt-0">
                      <span className="text-xs text-slate-400">{article.date}</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>

          {/* How Nuaico Works */}
          <section className="bg-slate-50 rounded-xl border border-gray-200 p-8 md:p-10">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 text-center mb-10">
              How Nuaico Works
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/3 left-0 w-full h-px bg-gray-200 -z-10" />
              {[
                { title: "Source", desc: "We scan 10k+ trusted industry sources daily.", icon: Icons.Search },
                { title: "Summarize", desc: "AI condenses fluff into factual bullets.", icon: Icons.Menu },
                { title: "Analyze", desc: "Our Lens engine predicts impact & risks.", icon: Icons.Activity },
                { title: "Deliver", desc: "You get the link and the 'so what'.", icon: Icons.ExternalLink },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-slate-50">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center border border-gray-200 text-brand-accent mb-4 shadow-sm">
                    <step.icon size={24} />
                  </div>
                  <h4 className="font-heading font-bold text-slate-900 text-sm mb-1">{step.title}</h4>
                  <p className="text-xs text-slate-500 px-2 leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>

        </div>
      </main>
    )
  }

  // casual style home page — social grid layout

  const filterSectors = ['All', ...SECTORS] as const
  const filteredArticles = selectedSector === 'All'
    ? articles
    : articles.filter(a => a.sector === selectedSector)

  // Sector color mapping for badges
  const sectorColors: Record<string, string> = {
    Finance: 'bg-emerald-500',
    Healthcare: 'bg-rose-500',
    Technology: 'bg-violet-500',
    Energy: 'bg-amber-500',
    Industry: 'bg-slate-500',
  }

  return (
    <main className="min-h-screen bg-brand-muted">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="sr-only">Nuaico - AI News</h1>

        {/* Hero Slideshow — featured/trending articles */}
        <section className="py-6">
          <HeroSlideshow news={featuredArticles} />
        </section>

        {/* Sector Filter Pills */}
        <nav className="py-4 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="flex gap-2 pb-1 justify-center">
            {filterSectors.map(sector => (
              <button
                key={sector}
                onClick={() => setSelectedSector(sector)}
                className={`
                  shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200
                  ${selectedSector === sector
                    ? 'bg-brand text-white'
                    : 'bg-brand/10 text-brand hover:bg-brand/20'
                  }
                `}
              >
                {sector}
              </button>
            ))}
          </div>
        </nav>

        {/* Image Grid */}
        <section className="pb-8">
          {filteredArticles.length === 0 && (
            <p className="text-center text-gray-500 py-16">No articles found for this sector.</p>
          )}

          <div className="grid grid-cols-2 md:grid-cols-3 gap-1">
            {filteredArticles.map((article) => (
              <Link key={article.id} href={`/news/${article.slug}`} className="block group relative">
                <div className="relative aspect-square overflow-hidden bg-gray-900">
                  <Image
                    src={article.imageUrl}
                    alt={article.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  {/* Dark overlay for text readability */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:from-black/90 group-hover:via-black/40 transition-all duration-300" />

                  {/* Sector indicator dot */}
                  <div className="absolute top-3 left-3">
                    <div className={`w-2.5 h-2.5 rounded-full ${sectorColors[article.sector] || 'bg-gray-500'} shadow-lg`} />
                  </div>

                  {/* Source attribution */}
                  {article.sourceDomain && (
                    <div className="absolute top-3 right-3">
                      <span className="text-[10px] font-medium text-white/60 uppercase tracking-wider">
                        {article.sourceDomain}
                      </span>
                    </div>
                  )}

                  {/* Title overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h2 className="text-white font-bold text-sm md:text-base leading-tight line-clamp-3 uppercase tracking-wide">
                      {article.title}
                    </h2>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
