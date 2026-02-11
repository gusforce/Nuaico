# Nuaico

AI-powered news analysis platform covering AI developments across 6 industry sectors. Offers two visual modes: **V1 Social Feed** (for students/curious consumers) and **V2 Intelligence Report** (for professionals/academics). Provides AI-generated summaries and impact analysis via the "Nuaico Lens" engine.

- **URL:** https://nuaico.com
- **Deployed on:** Vercel

## Product Vision

Two distinct ways to consume AI news:
- **V1 (Social Feed):** Scrollable card-based feed, visual, engaging, low friction. Target: students, curious consumers.
- **V2 (Intelligence Report):** Bloomberg/Stratfor-style briefing, data-dense, scannable, credibility-first. Target: professionals, academics, investors.

**Monetizable edge** is NOT raw news -- it's the AI analysis layer (Nuaico Lens + AI Chat). See `Nuaico Charlie Discussion.pdf` for full monetization strategy discussion.

**Monetization plan (layered value):**
- Free: all articles, sector breakdowns, AI summaries, pros & cons, shareable social summaries
- Paid (future): AI Article Chat (depth), Sector Dashboards, Saved Analysis & Alerts

## Tech Stack

- **Framework:** Next.js 15.2.6 (App Router), React 19, TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4, CSS custom properties for dual-style theming
- **UI:** Radix UI primitives, shadcn/ui (New York style), Lucide React icons
- **Fonts:** Inter (body, V1 headings), Merriweather (V2 headings)
- **Utilities:** Zod (validation), Sonner (toasts), cmdk (search), next-themes (dark mode), clsx + tailwind-merge via `cn()`
- **Planned additions:** Supabase (Postgres DB), @anthropic-ai/sdk (Claude API), Grok/xAI API, rss-parser

## Architecture

- **Currently static site** -- transitioning to dynamic with API routes + Supabase
- All data lives in `lib/data.ts` (19 articles, 6 sectors, 6 articles with full AI analysis)
- Dual style system via `data-style` attribute on `<html>` + CSS custom properties in `app/globals.css`
- Static generation via `generateStaticParams` for `/news/[slug]` and `/category/[slug]`
- Images are unoptimized (`next.config.mjs`: `images.unoptimized: true`)

## 6 Sectors

| Sector | Absorbs | Icon |
|--------|---------|------|
| Finance | (formerly: Finance, Real Estate) | TrendingUp |
| Healthcare | Healthcare | Activity |
| Technology | (formerly: Cybersecurity, Media) | Cpu |
| Energy | (formerly: Energy, Agriculture) | Zap |
| Government | (formerly: Government, Education) | Landmark |
| Industry | (formerly: Manufacturing, Transportation, Retail) | Factory |

## File Structure

```
app/
  layout.tsx            Root layout: fonts, ThemeProvider, StyleProvider, navbar, footer, ReadingProgress, NuChatWidget
  page.tsx              Home page (client component, V1=social feed, V2=intelligence report)
  globals.css           Global styles, CSS custom properties, style presets (casual/corp)
  about/page.tsx        About page
  news/[slug]/page.tsx  Article detail page (SSG with generateStaticParams)
  category/[slug]/page.tsx  Sector listing page (SSG, supports "all")
  error.tsx             Error boundary
  not-found.tsx         404 page
  robots.ts             robots.txt generation
  sitemap.ts            sitemap.xml generation

components/
  style-provider.tsx    StyleContext: manages casual/corp mode, persists to localStorage
  style-toggle.tsx      UI toggle between V1 and V2 modes
  theme-provider.tsx    Wraps next-themes ThemeProvider
  site-navbar.tsx       Navigation bar with search, style toggle, mobile menu
  site-footer.tsx       Footer with links and newsletter
  hero-slideshow.tsx    Featured articles carousel (legacy, no longer used on home page)
  news-by-sector.tsx    Sector-grouped article grid (legacy, no longer used on home page)
  newsletter-subscription.tsx  Newsletter signup form
  search-dialog.tsx     Command palette search (cmdk)
  article-page-content.tsx  Article detail view (client component)
  category-page-content.tsx Category listing view (client component)
  about-page-content.tsx    About page content (client component)
  reading-progress.tsx  Scroll-based reading progress bar at top of page
  corp/
    corp-hero.tsx       Hero section for Version 2 (legacy, replaced by Executive Summary header)
    nuaico-lens.tsx     AI analysis display component (Version 2)
  nu-chat/
    nu-chat-widget.tsx  Nu AI chatbot floating widget
    nu-message-list.tsx Chat message list display
    nu-input.tsx        Chat input component
  ui/                   shadcn/ui primitives (badge, button, card, command, dialog, input, sheet, sonner, tabs)

lib/
  data.ts               All article and sector data, query helpers (19 articles, 6 sectors)
  types.ts              TypeScript interfaces: Article, AIOpinion, Sector (6 values), SectorNewsData
  icons.ts              Centralized Lucide icon exports, 6 sector-to-icon mapping
  nu-engine.ts          Nu chatbot pattern-matching response engine
  utils.ts              cn() utility (clsx + tailwind-merge)
  use-newsletter.ts     Newsletter form hook with Zod validation (simulated submit)

public/
  images/nuaico-logo.png
  icon.svg, apple-icon.png, icon-dark-32x32.png, icon-light-32x32.png
  placeholder.svg, placeholder.jpg, placeholder-logo.png, placeholder-logo.svg, placeholder-user.jpg
```

## Key Conventions

1. **Client components** use `'use client'` directive. Server components are the default.
2. **Dual mode:** use `useStyle()` from `style-provider.tsx` -- check `isCorp` / `isCasual` for conditional rendering.
3. **Styling:** Tailwind utilities + CSS custom properties (`--brand-*`, `--font-heading`, `--font-body`). Style presets defined in `app/globals.css` under `[data-style="casual"]` and `[data-style="corp"]`.
4. **Path alias:** `@/` maps to project root (configured in `tsconfig.json`).
5. **UI components:** shadcn/ui New York style in `components/ui/`. Use `cn()` from `lib/utils.ts` for class merging.
6. **Persistence:** localStorage for style preference (`nuaico-style` key) and future bookmarks.
7. **Icons:** Import from `lib/icons.ts` which re-exports Lucide icons. Use `SectorIcons[sector]` for sector-specific icons.

## Data Model

```typescript
type Sector = 'Finance' | 'Healthcare' | 'Technology' | 'Energy' | 'Government' | 'Industry'

interface Article {
  id: string; title: string; slug: string; excerpt: string; content: string
  imageUrl: string; category: string; author: string; date: string; sector: Sector
  sourceDomain?: string; sourceUrl?: string; readTime?: string
  aiSummary?: string[]; aiOpinion?: AIOpinion; impactScore?: number
  tags?: string[]; whyPicked?: string; featured?: boolean
}

interface AIOpinion {
  change: string; beneficiaries: string; risks: string[]
  confidenceLevel: 'Low' | 'Medium' | 'High'; confidenceReason: string
  takeaways: string[]
}
```

Key data exports from `lib/data.ts`: `ALL_ARTICLES`, `SECTORS`, `featuredNews`, `sectorNews`, `getArticleBySlug()`, `getArticlesBySector()`, `getTrendingArticles()`.

## Development Commands

```bash
npm run dev       # Start dev server
npm run build     # Production build (static export)
npm run start     # Serve production build
npm run lint      # ESLint
```

## Progress Tracker

### Completed
- [x] **Phase 1: Sector Consolidation** -- Reduced from 12 sectors to 6 (Finance, Healthcare, Technology, Energy, Government, Industry). Updated types.ts, data.ts (all 19 articles remapped), icons.ts (6 icons), nu-engine.ts references.
- [x] **Phase 2: Visual Redesign** -- Home page completely redesigned for both modes:
  - V1 (Social Feed): Card-based scrollable feed with sector filter pills, "What's Hot" sidebar, newsletter CTA woven into feed, impact score badges, bookmark/share icons
  - V2 (Intelligence Report): Executive Summary header with date + article count, Priority Briefing (top 3 by impact), Sector Intelligence Grid (2x3), Full Analysis Feed (sortable table), How Nuaico Works section

- [x] **Phase 4: Nu AI Chat Enhancement** -- Upgraded from pattern-matching to real Claude AI (Sonnet 4.5) via streaming API route (`app/api/chat/route.ts`). Article-context-aware, sector-aware, conversation history support. Old engine kept as offline fallback (`generateFallbackResponse`). Chat widget supports streaming token display, abort/stop, and error fallback.
- [x] **Phase 5: Content & Polish** -- All 19 articles now have rich multi-paragraph content. All 19 articles have AI analysis fields (aiSummary, aiOpinion, impactScore, tags, readTime). Replaced picsum.photos with local placeholders. Fixed all broken navbar/footer links (Cybersecurity->Technology, Manufacturing->Industry, Governance->Government). Fixed "12 sectors" -> "6 sectors" in metadata and chat. Removed unused CorpHero import. Article detail pages now render content. Category pages polished with impact badges.

### In Progress / Next Up
- [ ] **Phase 3: News Scraping Pipeline** -- Supabase DB + RSS feed parsing + Claude API for AI analysis + Grok/xAI for trending discourse. Plan documented in `~/.claude/plans/purrfect-wandering-mango.md`.

### Known Issues
- No test suite, no CI/CD pipeline
- Newsletter form simulates submission (no real backend)
- `hero-slideshow.tsx` and `news-by-sector.tsx` are legacy components still in codebase but not actively used
- About page not yet updated for new visual modes
- Mobile responsiveness not fully tested

## Planned Features (Future)

- Real-time news scraping pipeline (Supabase + RSS + Grok + Claude)
- AI Article Chat as primary monetization lever (freemium: limited free questions, unlimited for subscribers)
- Sector Dashboards (trend tracking, risk vs opportunity maps)
- Saved Analysis & Alerts ("Notify me when AI impacts healthcare jobs")
- Article bookmarking system (infrastructure exists)
- Social sharing buttons (infrastructure exists)
- User accounts, API access, historical analysis
