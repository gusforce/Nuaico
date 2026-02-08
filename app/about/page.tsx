'use client'

import { Card, CardContent } from "@/components/ui/card"
import { useStyle } from "@/components/style-provider"
import { Icons } from "@/lib/icons"

export default function AboutPage() {
  const { isStudio } = useStyle()

  if (isStudio) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16">
        <h1 className="text-4xl font-heading font-bold text-slate-900 mb-6">About Nuaico</h1>
        <p className="text-xl text-slate-600 mb-12 leading-relaxed">
          We built Nuaico because keeping up with AI is a full-time job.
          Our mission is to filter the noise and provide clear, actionable intelligence on how artificial intelligence is reshaping our world, sector by sector.
        </p>

        <div className="space-y-12">
          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Search className="text-brand-accent" /> Methodology
            </h2>
            <div className="prose prose-slate">
              <p>
                Our system ingests thousands of articles daily from verified, high-authority domain sources (academic journals, tier-1 news outlets, industry reports). We explicitly filter out:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-slate-700 mt-4 mb-4">
                <li>Press releases disguised as news</li>
                <li>Crypto/Web3 speculative hype</li>
                <li>Opinion pieces lacking data</li>
                <li>Redundant aggregators</li>
              </ul>
              <p>
                Only stories with a perceptible impact on industry operations, regulations, or economics make the cut.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Icons.Activity className="text-brand-accent" /> The &quot;Nuaico Lens&quot;
            </h2>
            <div className="prose prose-slate">
              <p>
                Every article is processed by our fine-tuned Large Language Model (LLM). This model is not designed to &quot;create&quot; content, but to analyze it based on a strict framework:
              </p>
              <div className="bg-slate-50 p-6 rounded-lg border border-gray-200 mt-4">
                <h4 className="font-bold text-sm uppercase mb-2">System Instructions:</h4>
                <p className="font-mono text-sm text-slate-600">
                  &quot;Analyze the provided text for structural economic or operational changes. Identify winners and losers based on historical precedents of technological disruption. Maintain a neutral, skeptical tone. Do not use marketing language.&quot;
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Future Roadmap</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                "User Accounts & Custom Feeds",
                "API Access for Enterprise",
                "Historical Trend Analysis",
                "Expert Human Review Panel"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 p-4 border border-gray-100 rounded bg-white shadow-sm">
                  <div className="w-2 h-2 bg-slate-300 rounded-full" />
                  <span className="text-slate-700 font-medium">{item}</span>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    )
  }

  // v0 style about page
  return (
    <div className="container mx-auto px-4 py-12">
      <Card className="max-w-3xl mx-auto bg-white shadow-sm">
        <CardContent className="p-8 md:p-12">
          <h1 className="text-4xl font-bold mb-8 text-brand">About Nuaico</h1>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl mb-6">
              At Nuaico, we believe in the transformative power of artificial intelligence and the profound value it
              brings to humanity. AI is not just a trend — it&apos;s an inevitable part of our future.
            </p>

            <div className="border-l-4 border-brand-accent pl-6 my-8">
              <p className="text-xl italic text-brand">
                Our mission is to keep you informed, inspired, and prepared. We curate and share the most important
                updates, insights, and breakthroughs across the AI landscape so that you can stay ahead of the curve —
                not left behind.
              </p>
            </div>

            <p className="text-2xl font-medium text-brand mt-8">
              The future is unfolding now. Nuaico is here to help you understand it.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
