"use client"

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import gsap from "gsap"
import { useEffect, useRef } from "react"

interface NavMenuLinkProps {
  title: string
  active: boolean
  duration: number
  handleScroll: () => void
}

export default function NavMenuLink({
  title,
  active,
  duration,
  handleScroll,
}: NavMenuLinkProps) {
  const el = useRef<HTMLDivElement | null>(null)
  const tl = useRef<GSAPTimeline | null>(gsap.timeline({ paused: true }))

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      tl.current?.fromTo(
        el.current,
        { x: 150 },
        { x: 0, duration: duration, ease: "power3.inOut" },
        0
      )
    }, el)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (active) {
      tl.current?.play()
    } else {
      tl.current?.reverse()
    }
  }, [active])

  return (
    <div ref={el}>
      <div
        className="group flex !w-full cursor-pointer items-center justify-between px-[clamp(1.25rem,3vw,2.5rem)] py-3"
        onClick={() => handleScroll()}
      >
        <p className="text-black dark:text-white">{title}</p>
<div className="h-3 w-3 origin-center scale-0 rounded-full bg-black dark:bg-white transition group-hover:scale-100" />

      </div>
    </div>
  )
}
