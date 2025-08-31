"use client"

import About from "@/components/about/About"
import Contact from "@/components/contact/Contact"
import Hero from "@/components/hero/Hero"
import Nav from "@/components/navbar/Nav"
import Projects from "@/components/projects/Projects"
import Work from "@/components/work/Work"

export default function Home() {
  return (
    <>
      <Nav />
      <main data-scroll-container className="flex flex-col items-center">
        <Hero />
        <About />
        <Work />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
