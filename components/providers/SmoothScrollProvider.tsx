"use client"

import { createContext, useEffect, useRef } from "react"

export const SmoothScrollContext = createContext({
  scroll: null as LocomotiveScroll | null,
})

interface SmoothScrollProviderProps {
  children: React.ReactNode
  options?: any
}

export const SmoothScrollProvider = ({
  children,
  options,
}: SmoothScrollProviderProps) => {
  const scrollRef = useRef<LocomotiveScroll | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        if (typeof window === "undefined") return
        if (scrollRef.current) return
        const LocomotiveScroll = (await import("locomotive-scroll")).default
        const el = document.querySelector(
          "[data-scroll-container]"
        ) as HTMLElement | null
        if (!el) return
        if (!mounted) return
        scrollRef.current = new LocomotiveScroll({
          el,
          ...options,
        })
      } catch (error) {
        console.error(`[SmoothScrollProvider]:`, error)
      }
    })()

    return () => {
      mounted = false
      if (scrollRef.current) {
        try {
          scrollRef.current.destroy()
        } catch {}
        scrollRef.current = null
      }
    }
  }, [options])

  return (
    <SmoothScrollContext.Provider
      value={{
        scroll: scrollRef.current,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  )
}
