'use client'

import Image from "next/image"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { ALL_ARTICLES } from "@/lib/data"
import { useStyle } from "@/components/style-provider"
import { Icons } from "@/lib/icons"
import NuaicoLens from "@/components/corp/nuaico-lens"
import type { Article } from "@/lib/types"

interface ArticlePageContentProps {
  article: Article
}

export default function ArticlePageContent({ article }: ArticlePageContentProps) {
  const { isCorp } = useStyle()

  if (isCorp) {
    return (
      <div className="bg-white min-h-screen pb-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
          {/* Breadcrumb */}
          <Link
            href={`/category/${article.sector.toLowerCase().replace(' ', '-')}`}
            className="flex items-center gap-2 text-sm text-slate-500 hover:text-brand-accent mb-6 transition-colors"
          >
            <Icons.ChevronRight className="rotate-180 w-4 h-4" /> Back to {article.sector}
          </Link>

          <div className="space-y-4 mb-8">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="bg-slate-100 text-slate-700 text-xs font-bold px-2 py-1 rounded uppercase tracking-wider">{article.sector}</span>
              {article.readTime && (
                <span className="text-slate-400 text-sm flex items-center gap-1"><Icons.Clock size={14} /> {article.readTime}</span>
              )}
              {article.impactScore && (
                <span className="text-slate-400 text-sm flex items-center gap-1"><Icons.Chart size={14} /> Impact Score: {article.impactScore}</span>
              )}
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-bold text-slate-900 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center justify-between border-b border-gray-100 pb-8">
              <div className="flex items-center gap-3">
                {article.sourceDomain && (
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{article.sourceDomain}</span>
                    <span className="text-xs text-slate-500">{article.date}</span>
                  </div>
                )}
                {!article.sourceDomain && (
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-slate-900">{article.author}</span>
                    <span className="text-xs text-slate-500">{article.date}</span>
                  </div>
                )}
              </div>
              {article.sourceUrl && (
                <a
                  href={article.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2 bg-slate-900 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-slate-800 transition-colors shadow-sm"
                >
                  Read Original <Icons.ExternalLink size={14} />
                </a>
              )}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
            {/* Left Column */}
            <div className="md:col-span-4 space-y-8">
              {article.whyPicked && (
                <div className="bg-slate-50 p-6 rounded-xl border border-slate-100">
                  <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Why this was picked</h3>
                  <p className="text-sm text-slate-700 italic leading-relaxed">&quot;{article.whyPicked}&quot;</p>
                </div>
              )}

              {article.aiSummary && article.aiSummary.length > 0 && (
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                    <Icons.Menu className="text-brand-accent" size={20} /> AI Summary
                  </h3>
                  <div className="space-y-4">
                    {article.aiSummary.map((para, idx) => (
                      <p key={idx} className="text-slate-700 leading-relaxed text-sm md:text-base border-l-2 border-slate-200 pl-4">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right Column */}
            <div className="md:col-span-8 space-y-8">
              {article.aiOpinion && <NuaicoLens aiOpinion={article.aiOpinion} />}

              {!article.aiOpinion && (
                <div className="prose prose-lg max-w-none prose-headings:text-slate-900">
                  <p>{article.excerpt}</p>
                  <p className="text-slate-500 italic">AI analysis is not available for this article.</p>
                </div>
              )}

              {/* Related Stories */}
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-4">Related Stories</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {ALL_ARTICLES.filter(a => a.id !== article.id && a.sector === article.sector).slice(0, 2).map(related => (
                    <Link key={related.id} href={`/news/${related.slug}`} className="bg-white border border-gray-200 p-4 rounded-lg hover:border-brand-accent transition-colors">
                      <span className="text-xs font-bold text-slate-400 uppercase mb-1 block">{related.sector}</span>
                      <h4 className="font-bold text-slate-900 text-sm line-clamp-2">{related.title}</h4>
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // casual style article page
  return (
    <div className="container mx-auto px-4 py-8">
      <article className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-sm">
        <Badge className="mb-4 bg-brand-accent text-brand hover:bg-brand-accent/90">{article.category}</Badge>

        <h1 className="text-4xl font-bold mb-4 text-brand">{article.title}</h1>

        <div className="flex items-center gap-4 text-muted-foreground mb-8">
          <span>{article.author}</span>
          <span>&#8226;</span>
          <span>{article.date}</span>
        </div>

        <div className="relative aspect-video mb-8">
          <Image
            src={article.imageUrl || "/placeholder.svg"}
            alt={article.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        <div className="prose prose-lg max-w-none prose-headings:text-brand prose-a:text-brand-accent">
          <p>{article.excerpt}</p>
          {article.aiSummary && article.aiSummary.length > 0 ? (
            <>
              <h2>Key Insights</h2>
              {article.aiSummary.map((point, i) => (
                <p key={i}>{point}</p>
              ))}
            </>
          ) : (
            <>
              <h2>Key Developments</h2>
              <p>
                This article covers important developments in the {article.sector} sector.
                Check back for updated AI-powered analysis.
              </p>
            </>
          )}
        </div>
      </article>
    </div>
  )
}
