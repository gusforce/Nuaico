'use client'

import { Share2, Link, Twitter } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from 'sonner'

interface ShareButtonsProps {
  title: string
  slug: string
  className?: string
}

export default function ShareButtons({ title, slug, className }: ShareButtonsProps) {
  const url = `https://nuaico.com/news/${slug}`

  const shareTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const shareLinkedIn = () => {
    window.open(
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
      '_blank',
      'noopener,noreferrer'
    )
  }

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url)
      toast('Link copied!')
    } catch {
      toast('Could not copy link')
    }
  }

  const btnClass = cn(
    'inline-flex items-center justify-center w-8 h-8 rounded-lg text-gray-500 hover:text-gray-700 hover:bg-gray-100 transition-colors'
  )

  return (
    <div className={cn('flex items-center gap-1', className)}>
      <button onClick={shareTwitter} className={btnClass} aria-label="Share on Twitter">
        <Twitter size={16} />
      </button>
      <button onClick={shareLinkedIn} className={btnClass} aria-label="Share on LinkedIn">
        <span className="text-xs font-bold leading-none">in</span>
      </button>
      <button onClick={copyLink} className={btnClass} aria-label="Copy link">
        <Link size={16} />
      </button>
    </div>
  )
}
