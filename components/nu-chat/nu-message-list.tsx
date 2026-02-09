'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import type { Article } from '@/lib/types'

export interface ChatMessage {
  id: string
  role: 'user' | 'nu'
  text: string
  articles?: Article[]
  suggestions?: string[]
}

interface NuMessageListProps {
  messages: ChatMessage[]
  isCorp: boolean
  onSuggestionClick: (text: string) => void
}

export default function NuMessageList({ messages, isCorp, onSuggestionClick }: NuMessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {messages.map(msg => (
        <div key={msg.id} className={cn('flex gap-2', msg.role === 'user' ? 'justify-end' : 'justify-start')}>
          {msg.role === 'nu' && (
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 mt-1 overflow-hidden">
              <Image src="/Nuaico_logo_v2.svg" alt="Nu" width={28} height={28} />
            </div>
          )}
          <div className={cn('max-w-[85%] space-y-2')}>
            <div className={cn(
              'rounded-2xl px-3 py-2 text-sm leading-relaxed whitespace-pre-wrap',
              msg.role === 'user'
                ? isCorp
                  ? 'bg-slate-800 text-white rounded-br-md'
                  : 'bg-[hsl(var(--brand-dark))] text-white rounded-br-md'
                : isCorp
                  ? 'bg-slate-100 text-slate-800 rounded-bl-md'
                  : 'bg-gray-100 text-gray-800 rounded-bl-md'
            )}>
              {renderText(msg.text)}
            </div>

            {msg.articles && msg.articles.length > 0 && (
              <div className="space-y-1.5">
                {msg.articles.map(article => (
                  <Link
                    key={article.id}
                    href={`/news/${article.slug}`}
                    className={cn(
                      'block p-2 rounded-lg border text-xs hover:shadow-sm transition-shadow',
                      isCorp
                        ? 'border-slate-200 bg-white hover:border-slate-300'
                        : 'border-gray-200 bg-white hover:border-[hsl(var(--brand-accent))]'
                    )}
                  >
                    <p className={cn(
                      'font-semibold line-clamp-2',
                      isCorp ? 'text-slate-800' : 'text-gray-900'
                    )}>{article.title}</p>
                    <p className={cn(
                      'mt-0.5',
                      isCorp ? 'text-slate-400' : 'text-gray-400'
                    )}>{article.sector} {article.impactScore ? `| Impact: ${article.impactScore}` : ''}</p>
                  </Link>
                ))}
              </div>
            )}

            {msg.suggestions && msg.suggestions.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {msg.suggestions.map((s, i) => (
                  <button
                    key={i}
                    onClick={() => onSuggestionClick(s)}
                    className={cn(
                      'text-xs px-2.5 py-1 rounded-full border transition-colors',
                      isCorp
                        ? 'border-slate-300 text-slate-600 hover:bg-slate-100 hover:border-slate-400'
                        : 'border-[hsl(var(--brand-accent))]/40 text-[hsl(var(--brand-dark))] hover:bg-[hsl(var(--brand-accent))]/10 hover:border-[hsl(var(--brand-accent))]'
                    )}
                  >
                    {s}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  )
}

function renderText(text: string) {
  // Simple markdown-ish rendering for bold text
  const parts = text.split(/(\*\*[^*]+\*\*)/g)
  return parts.map((part, i) => {
    if (part.startsWith('**') && part.endsWith('**')) {
      return <strong key={i}>{part.slice(2, -2)}</strong>
    }
    return <span key={i}>{part}</span>
  })
}
