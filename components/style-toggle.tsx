'use client'

import { useStyle } from '@/components/style-provider'
import { cn } from '@/lib/utils'

export default function StyleToggle() {
  const { style, setStyle } = useStyle()

  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1 text-xs font-medium">
      <button
        onClick={() => setStyle('v0')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          style === 'v0'
            ? 'bg-brand text-brand-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        v0
      </button>
      <button
        onClick={() => setStyle('studio')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          style === 'studio'
            ? 'bg-brand text-brand-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
      >
        Studio
      </button>
    </div>
  )
}
