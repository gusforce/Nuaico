'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useStyle } from "@/components/style-provider"
import { Icons } from "@/lib/icons"

export default function AboutPageContent() {
  const { isCorp } = useStyle()

  if (isCorp) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-6">About Nuaico</h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          Nuaico is an AI-powered intelligence platform that monitors how artificial intelligence is reshaping industries. We filter the noise and deliver clear, actionable analysis across six sectors.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Search className="text-brand-accent" /> What We Cover
            </h2>
            <div className="prose prose-slate">
              <p>
                We track AI developments across six sectors, each with dedicated analysis:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-4 mb-4">
                {['Finance', 'Healthcare', 'Technology', 'Energy', 'Industry'].map(sector => (
                  <div key={sector} className="flex items-center gap-2 p-3 border border-gray-100 rounded bg-white shadow-sm">
                    <div className="w-2 h-2 bg-brand-accent rounded-full" />
                    <span className="text-slate-700 font-medium text-sm">{sector}</span>
                  </div>
                ))}
              </div>
              <p>
                Our system ingests articles from verified, high-authority sources — academic journals, tier-1 news outlets, and industry reports. We filter out press releases, speculative hype, opinion pieces without data, and redundant aggregators.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Activity className="text-brand-accent" /> The &quot;Nuaico Lens&quot;
            </h2>
            <div className="prose prose-slate">
              <p>
                Every article is processed by our AI analysis engine. It assigns an impact score (0–100), classifies the sector, identifies winners and losers, and generates actionable takeaways — all in a neutral, skeptical tone.
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-gray-200 mt-4">
                <h4 className="font-bold text-sm uppercase mb-2">Analysis Framework:</h4>
                <ul className="list-disc pl-5 space-y-1 text-sm text-slate-600">
                  <li>Impact scoring based on economic and operational significance</li>
                  <li>Sector classification with confidence assessment</li>
                  <li>Risk identification and beneficiary analysis</li>
                  <li>Concise summaries stripped of marketing language</li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Menu className="text-brand-accent" /> Two Ways to Read
            </h2>
            <div className="prose prose-slate">
              <p>
                Nuaico offers two distinct visual modes, accessible via the toggle in the navigation bar:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 mt-4">
                <li><strong>Social Feed (V1)</strong> — A card-based, visual feed designed for students and curious readers who want a quick scan of AI news.</li>
                <li><strong>Intelligence Report (V2)</strong> — A data-dense briefing styled for professionals, academics, and investors who need structured analysis.</li>
              </ul>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Nu AI Chat</h2>
            <div className="prose prose-slate">
              <p>
                Our AI assistant, Nu, is available in the bottom-right corner of every page. Ask it about any article, sector trends, or AI developments — it has full context of all Nuaico content and can provide deeper analysis on demand.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "Real-time news scraping pipeline",
                "Sector trend dashboards",
                "Saved analysis and alerts",
                "API access for enterprise",
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-gray-100 rounded bg-white shadow-sm">
                  <div className="w-2 h-2 bg-brand-accent rounded-full" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  // casual style about page
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto bg-white shadow-sm">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-brand">About Nuaico</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-6">
              AI is moving fast. Nuaico helps you keep up without reading everything. We scan hundreds of sources, pull out what matters, and let our AI break down the impact — so you get the signal, not the noise.
            </p>

            <div className="border-l-4 border-brand-accent pl-6 my-8">
              <p className="text-xl italic text-brand">
                Think of us as your AI news analyst. We read the articles, score the impact, and tell you who wins, who loses, and why it matters.
              </p>
            </div>

            <h2 className="text-2xl font-bold text-brand mt-10 mb-4">5 Sectors We Cover</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 not-prose mb-8">
              {['Finance', 'Healthcare', 'Technology', 'Energy', 'Industry'].map(sector => (
                <div key={sector} className="text-center py-3 px-4 bg-brand/5 rounded-lg">
                  <span className="font-semibold text-brand">{sector}</span>
                </div>
              ))}
            </div>

            <h2 className="text-2xl font-bold text-brand mt-10 mb-4">Two Ways to Read</h2>
            <p>
              Use the toggle in the top bar to switch between <strong>Social Feed</strong> (visual, card-based, great for scrolling) and <strong>Intelligence Report</strong> (data-dense, table-based, great for analysis). Pick the mode that fits how you like to consume news.
            </p>

            <h2 className="text-2xl font-bold text-brand mt-10 mb-4">Chat with Nu</h2>
            <p>
              See that chat bubble in the corner? That&apos;s Nu, our AI assistant. Ask it anything about the articles on Nuaico — &quot;What&apos;s the biggest risk in AI healthcare?&quot; or &quot;Summarize the top finance articles.&quot; It knows every article on the platform.
            </p>

            <p className="text-2xl font-medium text-brand mt-10">
              The future is unfolding now. Nuaico helps you understand it.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
