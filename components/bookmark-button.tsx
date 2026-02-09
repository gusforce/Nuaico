'use client'

import { useState, useEffect } from 'react'
import { Bookmark, BookmarkCheck } from 'lucide-react'
import { cn } from '@/lib/utils'
import { isBookmarked, toggleBookmark } from '@/lib/bookmarks'
import { toast } from 'sonner'

interface BookmarkButtonProps {
  slug: string
  className?: string
}

export default function BookmarkButton({ slug, className }: BookmarkButtonProps) {
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setSaved(isBookmarked(slug))
  }, [slug])

  const handleClick = () => {
    const nowSaved = toggleBookmark(slug)
    setSaved(nowSaved)
    toast(nowSaved ? 'Article saved!' : 'Article removed')
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm transition-colors',
        saved
          ? 'text-[hsl(var(--brand-accent))] bg-[hsl(var(--brand-accent))]/10'
          : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100',
        className
      )}
      aria-label={saved ? 'Remove bookmark' : 'Bookmark this article'}
    >
      {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
      <span className="hidden sm:inline">{saved ? 'Saved' : 'Save'}</span>
    </button>
  )
}
