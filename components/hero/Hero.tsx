"use client"

import { motion } from "framer-motion"
import HeroText from "./HeroText"
import ParallaxText from "./ParallaxText"

export default function Hero() {
  return (
    <motion.section
      id="hero"
      className="relative z-10 flex min-h-screen w-full flex-col items-center justify-center px-4 sm:px-6"
      initial="initial"
      animate="animate"
    >
            <HeroText />
      <div className="mt-8 w-full max-w-6xl overflow-hidden">
        <ParallaxText direction={500} baseVelocity={-1}>
          Frontend Web Developer
        </ParallaxText>
        <ParallaxText direction={-500} baseVelocity={1}>
          Freelance Web Developer
        </ParallaxText>
      </div>
          </motion.section>
  )
}
