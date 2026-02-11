'use client'

import { useState } from 'react'
import { Send, Square } from 'lucide-react'
import { cn } from '@/lib/utils'

interface NuInputProps {
  onSend: (message: string) => void
  disabled: boolean
  isCorp: boolean
  isStreaming?: boolean
  onStop?: () => void
}

export default function NuInput({ onSend, disabled, isCorp, isStreaming, onStop }: NuInputProps) {
  const [value, setValue] = useState('')

  const handleSubmit = () => {
    const trimmed = value.trim()
    if (!trimmed || disabled) return
    onSend(trimmed)
    setValue('')
  }

  return (
    <div className={cn(
      'flex items-center gap-2 p-3 border-t',
      isCorp ? 'border-slate-200 bg-white' : 'border-gray-200 bg-white'
    )}>
      <input
        type="text"
        value={value}
        onChange={e => setValue(e.target.value)}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault()
            handleSubmit()
          }
        }}
        disabled={disabled || isStreaming}
        placeholder="Ask Nu anything about AI news..."
        className={cn(
          'flex-1 text-sm outline-none bg-transparent placeholder:text-gray-400',
          (disabled || isStreaming) && 'opacity-50 cursor-not-allowed'
        )}
      />
      {isStreaming ? (
        <button
          onClick={onStop}
          className={cn(
            'p-1.5 rounded-full transition-colors',
            isCorp
              ? 'text-slate-600 hover:bg-slate-100'
              : 'text-[hsl(var(--brand-accent))] hover:bg-[hsl(var(--brand-accent))]/10'
          )}
          aria-label="Stop generating"
        >
          <Square size={16} />
        </button>
      ) : (
        <button
          onClick={handleSubmit}
          disabled={disabled || !value.trim()}
          className={cn(
            'p-1.5 rounded-full transition-colors',
            disabled || !value.trim()
              ? 'text-gray-300 cursor-not-allowed'
              : isCorp
                ? 'text-slate-600 hover:bg-slate-100'
                : 'text-[hsl(var(--brand-accent))] hover:bg-[hsl(var(--brand-accent))]/10'
          )}
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      )}
    </div>
  )
}
