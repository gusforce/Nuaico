'use client'

import { useState, useCallback } from 'react'
import { usePathname } from 'next/navigation'
import { X, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useStyle } from '@/components/style-provider'
import { generateResponse } from '@/lib/nu-engine'
import NuMessageList, { type ChatMessage } from './nu-message-list'
import NuInput from './nu-input'

function getSlugFromPath(pathname: string): string | undefined {
  const match = pathname.match(/^\/news\/(.+)$/)
  return match ? match[1] : undefined
}

let msgIdCounter = 0
function nextId() {
  return `msg-${++msgIdCounter}`
}

export default function NuChatWidget() {
  const { isCorp } = useStyle()
  const pathname = usePathname()
  const currentSlug = getSlugFromPath(pathname)

  const [isOpen, setIsOpen] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const greeting = isCorp
      ? "Welcome. I'm Nu, Nuaico's analysis assistant. I can summarize articles, surface trends, and provide sector-specific insights. How can I help?"
      : "Hey! I'm Nu, your AI news companion. I can summarize articles, find trending stories, and help you explore AI news across 12 sectors. What would you like to know?"
    return [{
      id: nextId(),
      role: 'nu' as const,
      text: greeting,
      suggestions: [
        "What's trending right now?",
        "Recommend me something to read",
        "What can you do?"
      ]
    }]
  })

  const handleSend = useCallback((text: string) => {
    const userMsg: ChatMessage = { id: nextId(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsThinking(true)

    setTimeout(() => {
      const response = generateResponse(text, currentSlug)
      const nuMsg: ChatMessage = {
        id: nextId(),
        role: 'nu',
        text: response.text,
        articles: response.articles,
        suggestions: response.suggestions
      }
      setMessages(prev => [...prev, nuMsg])
      setIsThinking(false)
    }, 500)
  }, [currentSlug])

  const handleSuggestionClick = useCallback((text: string) => {
    handleSend(text)
  }, [handleSend])

  return (
    <>
      {/* Chat Panel */}
      <div
        className={cn(
          'fixed bottom-20 right-6 z-50 w-[350px] max-h-[500px] flex flex-col rounded-2xl shadow-2xl overflow-hidden transition-all duration-300 origin-bottom-right',
          isOpen
            ? 'scale-100 opacity-100 pointer-events-auto'
            : 'scale-95 opacity-0 pointer-events-none',
          isCorp
            ? 'bg-white border border-slate-200'
            : 'bg-white border border-gray-200'
        )}
      >
        {/* Header */}
        <div className={cn(
          'flex items-center justify-between px-4 py-3 flex-shrink-0',
          isCorp
            ? 'bg-slate-800 text-white'
            : 'bg-[hsl(var(--brand-dark))] text-white'
        )}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} />
            <span className="font-semibold text-sm">Nu</span>
            <span className="text-xs opacity-70">AI Assistant</span>
          </div>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 rounded-full hover:bg-white/10 transition-colors"
            aria-label="Close chat"
          >
            <X size={16} />
          </button>
        </div>

        {/* Messages */}
        <NuMessageList
          messages={messages}
          isCorp={isCorp}
          onSuggestionClick={handleSuggestionClick}
        />

        {/* Thinking indicator */}
        {isThinking && (
          <div className="px-4 pb-2 flex items-center gap-2">
            <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden">
              <Image src="/Nuaico_logo_v2.svg" alt="Nu" width={28} height={28} />
            </div>
            <div className="flex gap-1">
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
              <span className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
            </div>
          </div>
        )}

        {/* Input */}
        <NuInput
          onSend={handleSend}
          disabled={isThinking}
          isCorp={isCorp}
        />
      </div>

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className={cn(
          'fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-105',
          isCorp
            ? 'bg-slate-800 text-white hover:bg-slate-700'
            : 'bg-[hsl(var(--brand-dark))] text-white hover:bg-[hsl(var(--brand-dark))]/90'
        )}
        aria-label={isOpen ? 'Close Nu chat' : 'Open Nu chat'}
      >
        {isOpen ? <X size={24} /> : <Image src="/Nuaico_logo_v2.svg" alt="Nu" width={32} height={32} className="rounded-full" />}
      </button>
    </>
  )
}
