'use client'

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import type { Article } from "@/lib/types"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const [articles, setArticles] = useState<Article[]>([])

  // Fetch articles from API when dialog opens
  useEffect(() => {
    if (open && articles.length === 0) {
      fetch('/api/articles')
        .then(res => res.json())
        .then((data: Article[]) => setArticles(data))
        .catch(() => {})
    }
  }, [open, articles.length])

  // Group articles by sector, filtered by query
  const filteredArticles = query.length > 0
    ? articles.filter((article) => {
        const searchStr = `${article.title} ${article.excerpt} ${article.sector} ${article.category} ${(article.tags || []).join(' ')}`.toLowerCase()
        return searchStr.includes(query.toLowerCase())
      })
    : articles.slice(0, 8) // Show top 8 when no query

  // Group by sector
  const groupedBySector = filteredArticles.reduce<Record<string, Article[]>>((acc, article) => {
    const sector = article.sector
    if (!acc[sector]) acc[sector] = []
    acc[sector].push(article)
    return acc
  }, {})

  const handleSelect = (slug: string) => {
    onOpenChange(false)
    setQuery("")
    router.push(`/news/${slug}`)
  }

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput
        placeholder="Search articles..."
        value={query}
        onValueChange={setQuery}
      />
      <CommandList>
        <CommandEmpty>No articles found.</CommandEmpty>
        {Object.entries(groupedBySector).map(([sector, sectorArticles]) => (
          <CommandGroup key={sector} heading={sector}>
            {sectorArticles.map((article) => (
              <CommandItem
                key={article.id}
                value={`${article.title} ${article.sector}`}
                onSelect={() => handleSelect(article.slug)}
                className="cursor-pointer"
              >
                <div className="flex flex-col">
                  <span className="font-medium text-sm">{article.title}</span>
                  <span className="text-xs text-muted-foreground line-clamp-1">{article.excerpt}</span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        ))}
      </CommandList>
    </CommandDialog>
  )
}
