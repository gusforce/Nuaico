'use client'

import { useState, useCallback, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { X, Sparkles } from 'lucide-react'
import Image from 'next/image'
import { cn } from '@/lib/utils'
import { useStyle } from '@/components/style-provider'
import { generateFallbackResponse } from '@/lib/nu-engine'
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
  const [abortController, setAbortController] = useState<AbortController | null>(null)
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    const greeting = isCorp
      ? "Welcome. I'm Nu, Nuaico's analysis assistant. I can summarize articles, surface trends, and provide sector-specific insights. How can I help?"
      : "Hey! I'm Nu, your AI news companion. I can summarize articles, find trending stories, and help you explore AI news across 6 sectors. What would you like to know?"
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

  // Track whether we are currently streaming (for the stop button)
  const isStreamingRef = useRef(false)

  const handleSend = useCallback(async (text: string) => {
    const userMsg: ChatMessage = { id: nextId(), role: 'user', text }
    setMessages(prev => [...prev, userMsg])
    setIsThinking(true)

    // Build history from existing messages (last 20 messages = ~10 pairs)
    const historyMessages = [...messages, userMsg]
      .filter(m => m.role === 'user' || m.role === 'nu')
      .slice(-20)
      .map(m => ({
        role: (m.role === 'user' ? 'user' : 'assistant') as 'user' | 'assistant',
        content: m.text,
      }))
    // Remove the last entry (the current user message) since the API adds it
    historyMessages.pop()

    const controller = new AbortController()
    setAbortController(controller)
    isStreamingRef.current = true

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: text,
          history: historyMessages,
          articleSlug: currentSlug,
        }),
        signal: controller.signal,
      })

      if (!res.ok || !res.body) {
        throw new Error('API request failed')
      }

      const reader = res.body.getReader()
      const decoder = new TextDecoder()
      const nuMsgId = nextId()
      let accumulated = ''
      let firstChunk = true

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        accumulated += chunk

        if (firstChunk) {
          setIsThinking(false)
          setMessages(prev => [...prev, {
            id: nuMsgId,
            role: 'nu',
            text: accumulated,
            isStreaming: true,
          }])
          firstChunk = false
        } else {
          setMessages(prev => prev.map(m =>
            m.id === nuMsgId ? { ...m, text: accumulated } : m
          ))
        }
      }

      // Stream complete -- finalize message with suggestions
      setMessages(prev => prev.map(m =>
        m.id === nuMsgId
          ? {
              ...m,
              text: accumulated,
              isStreaming: false,
              suggestions: [
                "What's trending?",
                "Tell me more",
                "What can you do?"
              ],
            }
          : m
      ))
    } catch (err: unknown) {
      // If aborted by user, finalize the message as-is
      if (err instanceof DOMException && err.name === 'AbortError') {
        setMessages(prev => prev.map(m =>
          m.isStreaming ? { ...m, isStreaming: false } : m
        ))
      } else {
        // Fall back to local engine
        setIsThinking(false)
        const fallback = generateFallbackResponse(text, currentSlug)
        const nuMsg: ChatMessage = {
          id: nextId(),
          role: 'nu',
          text: fallback.text,
          articles: fallback.articles,
          suggestions: fallback.suggestions,
        }
        setMessages(prev => {
          // Remove any incomplete streaming message
          const cleaned = prev.filter(m => !m.isStreaming)
          return [...cleaned, nuMsg]
        })
      }
    } finally {
      setIsThinking(false)
      setAbortController(null)
      isStreamingRef.current = false
    }
  }, [currentSlug, messages])

  const handleStop = useCallback(() => {
    abortController?.abort()
  }, [abortController])

  const handleSuggestionClick = useCallback((text: string) => {
    handleSend(text)
  }, [handleSend])

  const isStreaming = messages.some(m => m.isStreaming)

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
          isStreaming={isStreaming}
          onStop={handleStop}
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
