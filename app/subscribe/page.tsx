'use client'

import NewsletterSubscription from "@/components/newsletter-subscription"
import { useStyle } from "@/components/style-provider"

export default function SubscribePage() {
  const { isCorp } = useStyle()

  return (
    <main className={`min-h-screen ${isCorp ? 'bg-white' : 'bg-brand-muted'}`}>
      <div className="max-w-xl mx-auto px-4 py-20">
        <h1 className={`text-3xl font-bold mb-3 ${isCorp ? 'font-heading text-slate-900' : 'text-brand'}`}>
          Stay Informed
        </h1>
        <p className={`mb-8 ${isCorp ? 'text-slate-600' : 'text-brand/70'}`}>
          Get the most important AI developments delivered to your inbox. We cover 5 sectors — Finance, Healthcare, Technology, Energy, and Industry — so you never miss what matters.
        </p>
        <NewsletterSubscription />
      </div>
    </main>
  )
}
