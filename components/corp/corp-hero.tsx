'use client'

import Link from "next/link"

export default function CorpHero() {
  return (
    <section className="bg-white border-b border-gray-200 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-heading font-bold text-slate-900 tracking-tight">
          AI Sector News, <span className="text-brand-accent italic">Explained.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
          What happened, why it matters, and what changes next. <br />
          Unbiased AI-powered analysis for busy professionals.
        </p>
        <div className="flex justify-center gap-4 pt-4">
          <button
            className="bg-brand-dark text-white px-8 py-3 rounded-full font-medium hover:opacity-90 transition-transform hover:-translate-y-1"
            onClick={() => {
              document.getElementById('highlights')?.scrollIntoView({ behavior: 'smooth' })
            }}
          >
            Start Reading
          </button>
          <Link href="/about" className="text-slate-600 px-8 py-3 font-medium hover:text-slate-900">
            How it works
          </Link>
        </div>
      </div>
    </section>
  )
}
