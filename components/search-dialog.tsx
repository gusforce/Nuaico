'use client'

import { useState } from "react"
import { useRouter } from "next/navigation"
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command"
import { ALL_ARTICLES } from "@/lib/data"
import type { Article } from "@/lib/types"

interface SearchDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function SearchDialog({ open, onOpenChange }: SearchDialogProps) {
  const router = useRouter()
  const [query, setQuery] = useState("")

  // Group articles by sector, filtered by query
  const filteredArticles = query.length > 0
    ? ALL_ARTICLES.filter((article) => {
        const searchStr = `${article.title} ${article.excerpt} ${article.sector} ${article.category} ${(article.tags || []).join(' ')}`.toLowerCase()
        return searchStr.includes(query.toLowerCase())
      })
    : ALL_ARTICLES.slice(0, 8) // Show top 8 when no query

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
        {Object.entries(groupedBySector).map(([sector, articles]) => (
          <CommandGroup key={sector} heading={sector}>
            {articles.map((article) => (
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
