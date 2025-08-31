"use client"

import useIsomorphicLayoutEffect from "@/hooks/UseIsomorphicLayoutEffect"
import { cn } from "@/lib/utils"
import gsap from "gsap"
import { useEffect, useRef, useState } from "react"
import ThemeSwitcher from "../ThemeSwitcher"
import MagneticEffect from "../providers/MagneticEffect"
import NavMenuBtn from "./NavMenuBtn"
import NavMenuLine from "./NavMenuLine"
import NavMenuLink from "./NavMenuLink"

export default function NavMenu() {
  const [active, setActive] = useState<boolean>(false)
  const [scroll, setScroll] = useState<LocomotiveScroll | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)
  const menuBgRef = useRef<HTMLDivElement | null>(null)

  const toggleHamburger = (status: boolean) => {
    setActive(status)
  }

  useEffect(() => {
    import("locomotive-scroll").then((locomotiveModule) => {
      const locomotivescroll = new locomotiveModule.default()
      setScroll(locomotivescroll)
    })
  }, [])

  useIsomorphicLayoutEffect(() => {
    gsap.context(() => {
      if (active) {
        gsap.to(menuRef.current, { x: 0, duration: 0.8, ease: "power3.inOut" })
        gsap.to(".nav-rounded", {
          scaleX: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(menuBgRef.current, {
          opacity: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
      } else {
        gsap.to(menuRef.current, {
          x: "140%",
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(".nav-rounded", {
          scaleX: 1,
          duration: 0.8,
          ease: "power3.inOut",
        })
        gsap.to(menuBgRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: "power3.inOut",
        })
      }
    }, menuRef)
  }, [active])

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setActive(false)
    }
  }

  const handleScroll = (id: string) => {
    scroll && scroll.scrollTo(id, { duration: 2 })
    setActive(false)
  }

  return (
    <>
      <div
        ref={menuBgRef}
        className={cn(
          "nav-menu-bg absolute left-0 top-0 h-screen w-full bg-gradient-to-r from-black/[.13] via-black/[.16] to-black/[.35] opacity-0 lg:hidden",
          active ? "pointer-events-auto" : "pointer-events-none"
        )}
        onClick={() => setActive(false)}
        onKeyDown={() => handleKeyDown}
      ></div>
      <div
        ref={menuRef}
        className={cn(
          "nav-menu pointer-events-auto absolute right-0 top-0 flex h-full w-full max-w-lg translate-x-[150%] flex-col justify-between bg-zinc-200 pb-12 pt-[clamp(3.5rem,10vh,5rem)] text-6xl text-black will-change-transform [-webkit-perspective:1000] dark:bg-zinc-800 dark:text-white lg:hidden"
        )}
      >
        <div className="nav-rounded absolute left-0 top-[-10%] z-[-1] h-[120%] w-[80%] -translate-x-1/2 rounded-[100%_100%] bg-zinc-200 will-change-transform [-webkit-perspective:1000] dark:bg-zinc-800"></div>
        <div>
          <NavMenuLine title={"Navigation"} />
        </div>
        <div>
          <MagneticEffect>
            <NavMenuLink
              title={"Home"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#hero")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"About"}
              active={active}
              duration={1}
              handleScroll={() => handleScroll("#about")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Projects"}
              active={active}
              duration={1.2}
              handleScroll={() => handleScroll("#projects")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Work"}
              active={active}
              duration={1.25}
              handleScroll={() => handleScroll("#work")}
            />
          </MagneticEffect>
          <MagneticEffect>
            <NavMenuLink
              title={"Contact"}
              active={active}
              duration={1.3}
              handleScroll={() => handleScroll("#contact")}
            />
          </MagneticEffect>
        </div>
        <div>
          <div className="flex px-[clamp(1.25rem,3vw,2.5rem)]">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <div className="hidden lg:flex absolute right-[2.5%] top-4 z-[51]">
        <div className="flex items-center gap-8 text-black dark:text-white text-lg md:text-xl font-medium tracking-normal leading-none antialiased font-sans bg-white/20 dark:bg-black/30 backdrop-blur-md border border-white/30 dark:border-white/20 rounded-xl px-5 py-2 shadow-md shadow-black/10 dark:shadow-black/40">
          <button className="hover:opacity-80 transition-colors" onClick={() => handleScroll("#hero")}>
            Home
          </button>
          <button className="hover:opacity-80 transition-colors" onClick={() => handleScroll("#about")}>
            About
          </button>
          <button className="hover:opacity-80 transition-colors" onClick={() => handleScroll("#projects")}>
            Projects
          </button>
          <button className="hover:opacity-80 transition-colors" onClick={() => handleScroll("#work")}>
            Work
          </button>
          <button className="hover:opacity-80 transition-colors" onClick={() => handleScroll("#contact")}>
            Contact
          </button>
          <div className="pl-2">
            <ThemeSwitcher />
          </div>
        </div>
      </div>
      <div className="lg:hidden">
        <NavMenuBtn active={active} toggleHamburger={toggleHamburger} />
      </div>
    </>
  )
}
