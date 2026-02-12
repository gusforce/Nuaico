import { createClient } from '@supabase/supabase-js'

// Load env vars - when running with tsx, dotenv is not auto-loaded
import { config } from 'dotenv'
config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local')
  process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

// Import static articles - use dynamic import for ESM compat
async function main() {
  // We need to read the data directly since it's a TS module
  const { ALL_ARTICLES } = await import('../lib/data')

  console.log(`Seeding ${ALL_ARTICLES.length} articles into Supabase...`)

  for (const article of ALL_ARTICLES) {
    const row = {
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      content: article.content,
      image_url: article.imageUrl,
      category: article.category,
      author: article.author,
      date: article.date,
      sector: article.sector,
      source_domain: article.sourceDomain || null,
      source_url: article.sourceUrl || null,
      read_time: article.readTime || null,
      impact_score: article.impactScore || null,
      tags: article.tags || null,
      featured: article.featured || false,
      ai_summary: article.aiSummary || null,
      ai_opinion: article.aiOpinion || null,
      why_picked: article.whyPicked || null,
    }

    const { error } = await supabase
      .from('articles')
      .upsert(row, { onConflict: 'slug' })

    if (error) {
      console.error(`  Failed: ${article.title} — ${error.message}`)
    } else {
      console.log(`  Seeded: ${article.title}`)
    }
  }

  console.log('Done!')
}

main().catch(console.error)
