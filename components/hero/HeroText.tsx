import React from "react"
import { AnimateWords } from "./AnimateWords"
import { motion } from "framer-motion"

export default function HeroText() {
  return (
    <div className="flex w-full flex-col items-end justify-center px-6 sm:px-8 md:px-10">
      <div
  className="
    relative flex w-full 
    sm:max-w-3xl md:max-w-4xl lg:max-w-5xl 
    flex-col items-end text-right justify-center
    mt-64 sm:mt-0
  "
>

        <AnimateWords
          title="MIQUEL YOSAFAT"
          style="
            inline-block overflow-hidden pt-1 
            text-6xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl 
            font-bold tracking-tight
          "
        />
        <motion.p
          initial={{ y: 20, opacity: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: {
              delay: 1.2,
              duration: 0.8,
              ease: [0.2, 0.65, 0.3, 0.9],
            },
          }}
          className="
            mt-2 sm:mt-4
            max-w-lg sm:max-w-2xl 
            text-sm sm:text-base md:text-lg lg:text-2xl 
            text-zinc-700 dark:text-zinc-300
          "
        >
          Frontend Developer & Video Editor crafting engaging digital experiences.
        </motion.p>
      </div>
    </div>
  )
}
