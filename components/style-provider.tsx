'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type StyleName = 'casual' | 'corp'

interface StyleContextValue {
  style: StyleName
  setStyle: (style: StyleName) => void
  isCasual: boolean
  isCorp: boolean
}

const StyleContext = createContext<StyleContextValue | undefined>(undefined)

interface StyleProviderProps {
  children: React.ReactNode
  defaultStyle?: StyleName
}

export function StyleProvider({ children, defaultStyle = 'casual' }: StyleProviderProps) {
  const [style, setStyleState] = useState<StyleName>(defaultStyle)

  useEffect(() => {
    const stored = localStorage.getItem('nuaico-style') as StyleName | null
    if (stored === 'casual' || stored === 'corp') {
      setStyleState(stored)
      document.documentElement.setAttribute('data-style', stored)
    } else {
      document.documentElement.setAttribute('data-style', defaultStyle)
    }
  }, [defaultStyle])

  const setStyle = (newStyle: StyleName) => {
    setStyleState(newStyle)
    localStorage.setItem('nuaico-style', newStyle)
    document.documentElement.setAttribute('data-style', newStyle)
  }

  return (
    <StyleContext.Provider
      value={{
        style,
        setStyle,
        isCasual: style === 'casual',
        isCorp: style === 'corp',
      }}
    >
      {children}
    </StyleContext.Provider>
  )
}

export function useStyle() {
  const context = useContext(StyleContext)
  if (!context) {
    throw new Error('useStyle must be used within a StyleProvider')
  }
  return context
}
