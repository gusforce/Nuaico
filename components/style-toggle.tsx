'use client'

import { useStyle } from '@/components/style-provider'
import { cn } from '@/lib/utils'

export default function StyleToggle() {
  const { style, setStyle } = useStyle()

  return (
    <div className="flex items-center gap-1 rounded-full bg-muted p-1 text-xs font-medium">
      <button
        onClick={() => setStyle('casual')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          style === 'casual'
            ? 'bg-brand text-brand-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={style === 'casual'}
      >
        V1
      </button>
      <button
        onClick={() => setStyle('corp')}
        className={cn(
          'rounded-full px-3 py-1 transition-colors',
          style === 'corp'
            ? 'bg-brand text-brand-foreground shadow-sm'
            : 'text-muted-foreground hover:text-foreground'
        )}
        aria-pressed={style === 'corp'}
      >
        V2
      </button>
    </div>
  )
}
