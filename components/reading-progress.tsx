'use client'

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

export default function ReadingProgress() {
  const pathname = usePathname()
  const [progress, setProgress] = useState(0)
  const isArticlePage = pathname.startsWith('/news/')

  useEffect(() => {
    if (!isArticlePage) return

    const handleScroll = () => {
      const scrollY = window.scrollY
      const docHeight = document.documentElement.scrollHeight
      const winHeight = window.innerHeight
      const maxScroll = docHeight - winHeight
      if (maxScroll <= 0) {
        setProgress(100)
        return
      }
      setProgress(Math.min(100, (scrollY / maxScroll) * 100))
    }

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [isArticlePage])

  if (!isArticlePage) return null

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[60] bg-transparent">
      <div
        className="h-full bg-[hsl(var(--brand-accent))] transition-[width] duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}
