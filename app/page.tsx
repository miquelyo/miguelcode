"use client"

import About from "@/components/about/About"
import Contact from "@/components/contact/Contact"
import Hero from "@/components/hero/Hero"
import Nav from "@/components/navbar/Nav"
import Projects from "@/components/projects/Projects"

export default function Home() {
  return (
    <>
      <Nav />
      <main data-scroll-container className="flex flex-col items-center">
        <Hero />
        <About />
        <Projects />
        <Contact />
      </main>
    </>
  )
}
