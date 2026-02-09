# Nuaico

AI-powered news analysis website covering AI developments across 12 industry sectors. Offers two visual modes ("Version 1" casual and "Version 2" corp) and provides AI-generated summaries and impact analysis via the "Nuaico Lens" engine.

- **URL:** https://nuaico.com
- **Deployed on:** Vercel

## Tech Stack

- **Framework:** Next.js 15.2.6 (App Router), React 19, TypeScript (strict mode)
- **Styling:** Tailwind CSS 3.4, CSS custom properties for dual-style theming
- **UI:** Radix UI primitives, shadcn/ui (New York style), Lucide React icons
- **Fonts:** Inter (body, Version 1 headings), Merriweather (Version 2 headings)
- **Utilities:** Zod (validation), Sonner (toasts), cmdk (search), next-themes (dark mode), clsx + tailwind-merge via `cn()`

## Architecture

- **Fully static site** -- no API routes, no database, no backend
- All data lives in `lib/data.ts` (19 articles, 12 sectors, 6 articles with full AI analysis)
- Dual style system via `data-style` attribute on `<html>` + CSS custom properties in `app/globals.css`
- Static generation via `generateStaticParams` for `/news/[slug]` and `/category/[slug]`
- Images are unoptimized (`next.config.mjs`: `images.unoptimized: true`)

## File Structure

```
app/
  layout.tsx            Root layout: fonts, ThemeProvider, StyleProvider, navbar, footer, ReadingProgress, NuChatWidget
  page.tsx              Home page (client component, renders different UI per style mode)
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
  style-toggle.tsx      UI toggle between Casual and Corp modes
  theme-provider.tsx    Wraps next-themes ThemeProvider
  site-navbar.tsx       Navigation bar with search, style toggle, mobile menu
  site-footer.tsx       Footer with links and newsletter
  hero-slideshow.tsx    Featured articles carousel (Version 1)
  news-by-sector.tsx    Sector-grouped article grid (Version 1)
  newsletter-subscription.tsx  Newsletter signup form
  search-dialog.tsx     Command palette search (cmdk)
  article-page-content.tsx  Article detail view (client component)
  category-page-content.tsx Category listing view (client component)
  about-page-content.tsx    About page content (client component)
  reading-progress.tsx  Scroll-based reading progress bar at top of page
  corp/
    corp-hero.tsx       Hero section for Version 2
    nuaico-lens.tsx     AI analysis display component (Version 2)
  nu-chat/
    nu-chat-widget.tsx  Nu AI chatbot floating widget
    nu-message-list.tsx Chat message list display
    nu-input.tsx        Chat input component
  ui/                   shadcn/ui primitives (badge, button, card, command, dialog, input, sheet, sonner, tabs)

lib/
  data.ts               All article and sector data, query helpers
  types.ts              TypeScript interfaces: Article, AIOpinion, Sector, SectorNewsData
  icons.ts              Centralized Lucide icon exports, sector-to-icon mapping
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
type Sector = 'Finance' | 'Healthcare' | 'Energy' | 'Manufacturing' | 'Retail' |
  'Media' | 'Government' | 'Education' | 'Transportation' | 'Cybersecurity' |
  'Real Estate' | 'Agriculture'

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

## Current Status and Known Issues

- No test suite, no CI/CD pipeline
- Newsletter form simulates submission (no real backend)
- Article `content` field is empty string for all 19 articles
- Some images use `picsum.photos` (unreliable/slow external service)

## Planned Features

- Article bookmarking system
- Social sharing buttons
- User accounts, API access, historical analysis (future)
