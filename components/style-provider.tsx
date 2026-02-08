'use client'

import * as React from 'react'
import { createContext, useContext, useEffect, useState } from 'react'

type StyleName = 'v0' | 'studio'

interface StyleContextValue {
  style: StyleName
  setStyle: (style: StyleName) => void
  isV0: boolean
  isStudio: boolean
}

const StyleContext = createContext<StyleContextValue | undefined>(undefined)

interface StyleProviderProps {
  children: React.ReactNode
  defaultStyle?: StyleName
}

export function StyleProvider({ children, defaultStyle = 'v0' }: StyleProviderProps) {
  const [style, setStyleState] = useState<StyleName>(defaultStyle)

  useEffect(() => {
    const stored = localStorage.getItem('nuaico-style') as StyleName | null
    if (stored === 'v0' || stored === 'studio') {
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
        isV0: style === 'v0',
        isStudio: style === 'studio',
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
