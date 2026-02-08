'use client'

import HeroSlideshow from "@/components/hero-slideshow"
import NewsBySector from "@/components/news-by-sector"
import StudioHero from "@/components/studio/studio-hero"
import NewsletterSubscription from "@/components/newsletter-subscription"
import { featuredNews, sectorNews, getTrendingArticles, ALL_ARTICLES, SECTORS } from "@/lib/data"
import { SectorIcons, Icons } from "@/lib/icons"
import { useStyle } from "@/components/style-provider"
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"

export default function Home() {
  const { isStudio } = useStyle()

  if (isStudio) {
    const trendingArticles = getTrendingArticles()
    const highlightArticles = ALL_ARTICLES.filter(a => a.aiOpinion).slice(0, 3)

    return (
      <main className="min-h-screen bg-brand-muted">
        <StudioHero />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
          {/* Today's Highlights */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-slate-900 font-heading flex items-center gap-2">
                <Icons.Zap className="text-brand-accent" /> Today&apos;s Highlights
              </h2>
              <span className="text-sm text-slate-500">{new Date().toLocaleDateString()}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {highlightArticles.map(article => (
                <Link key={article.id} href={`/news/${article.slug}`}>
                  <Card className="overflow-hidden hover:shadow-md transition-all cursor-pointer h-full">
                    <div className="relative h-48 bg-gray-200 overflow-hidden">
                      {article.imageUrl && (
                        <Image src={article.imageUrl} alt={article.title} fill className="object-cover hover:scale-105 transition-transform duration-500" />
                      )}
                      <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-bold text-brand-dark shadow-sm">
                        {article.sector}
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        {article.sourceDomain && (
                          <>
                            <span className="text-xs text-gray-500 font-medium">{article.sourceDomain}</span>
                            <span className="text-gray-300 text-xs">&#8226;</span>
                          </>
                        )}
                        <span className="text-xs text-gray-500">{article.date}</span>
                      </div>
                      <h3 className="font-heading font-bold text-slate-900 leading-tight mb-2 line-clamp-3">{article.title}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{article.excerpt}</p>
                      {article.impactScore && (
                        <div className="flex items-center gap-1 text-brand-accent font-bold text-sm mt-3">
                          <Icons.Activity size={16} />
                          <span>{article.impactScore}</span>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </section>

          {/* Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-8">
              <div className="flex items-center justify-between border-b border-gray-200 pb-2">
                <h3 className="font-bold text-lg text-slate-900">Trending Now</h3>
              </div>
              <div className="space-y-4">
                {trendingArticles.map(article => (
                  <Link key={`trending-${article.id}`} href={`/news/${article.slug}`}>
                    <div className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 flex flex-row h-32 mb-4">
                      <div className="w-32 shrink-0 bg-gray-200 overflow-hidden relative">
                        {article.imageUrl && (
                          <Image src={article.imageUrl} alt={article.title} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        )}
                      </div>
                      <div className="p-4 flex flex-col justify-between grow">
                        <div>
                          <span className="text-xs font-semibold text-brand-accent uppercase tracking-wider mb-1 block">{article.sector}</span>
                          <h3 className="text-sm font-heading font-bold text-slate-900 group-hover:text-brand-accent leading-tight line-clamp-2">{article.title}</h3>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
                <h3 className="font-bold text-lg text-slate-900 mb-4">Explore Sectors</h3>
                <div className="grid grid-cols-2 gap-3">
                  {SECTORS.map(sector => {
                    const Icon = SectorIcons[sector]
                    return (
                      <Link
                        key={sector}
                        href={`/category/${sector.toLowerCase().replace(' ', '-')}`}
                        className="flex flex-col items-center justify-center p-3 rounded-lg border border-gray-100 hover:border-brand-accent/30 hover:bg-slate-50 transition-all text-center group"
                      >
                        <Icon className="w-6 h-6 text-slate-400 group-hover:text-brand-accent mb-2" />
                        <span className="text-xs font-medium text-slate-700">{sector}</span>
                      </Link>
                    )
                  })}
                </div>
              </div>

              <div className="bg-brand-dark text-white rounded-xl p-6">
                <h3 className="font-bold text-lg mb-2">Daily Brief</h3>
                <p className="text-slate-300 text-sm mb-4">
                  Get the top 5 most impactful AI stories delivered to your inbox every morning. No spam, just signal.
                </p>
                <div className="flex gap-2">
                  <input type="email" placeholder="email@work.com" className="bg-slate-800 border-none rounded-md px-3 py-2 text-sm w-full text-white placeholder-slate-500 focus:ring-1 focus:ring-brand-accent" />
                  <button className="bg-brand-accent px-4 py-2 rounded-md text-sm font-bold hover:opacity-90">
                    Join
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* How it works */}
          <section className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12">
            <h3 className="text-center font-bold text-xl mb-12">How Nuaico Works</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
              <div className="hidden md:block absolute top-1/3 left-0 w-full h-0.5 bg-gray-100 -z-10" />
              {[
                { title: "Source", desc: "We scan 10k+ trusted industry sources daily.", icon: Icons.Search },
                { title: "Summarize", desc: "AI condenses fluff into factual bullets.", icon: Icons.Menu },
                { title: "Analyze", desc: "Our 'Lens' engine predicts impact & risks.", icon: Icons.Activity },
                { title: "Deliver", desc: "You get the link and the 'so what'.", icon: Icons.ExternalLink },
              ].map((step, idx) => (
                <div key={idx} className="flex flex-col items-center text-center bg-white">
                  <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center border border-gray-200 text-brand-accent mb-4 shadow-sm">
                    <step.icon size={28} />
                  </div>
                  <h4 className="font-bold text-slate-900 mb-2">{step.title}</h4>
                  <p className="text-sm text-slate-500 px-4">{step.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
    )
  }

  // v0 style home page
  return (
    <main className="min-h-screen bg-brand-muted">
      <div className="container mx-auto px-4 py-8">
        <h1 className="sr-only">Nuaico - News</h1>

        <section className="mb-12">
          <HeroSlideshow news={featuredNews} />
        </section>

        <div className="border-t-4 border-brand/20 my-10" />

        <section>
          <h2 className="text-3xl font-bold mb-8 text-brand">Latest News</h2>
          <NewsBySector sectorNews={sectorNews} />
        </section>

        <div className="border-t-4 border-brand/20 my-14" />

        <section className="my-16">
          <div className="max-w-xl mx-auto">
            <NewsletterSubscription />
          </div>
        </section>
      </div>
    </main>
  )
}
