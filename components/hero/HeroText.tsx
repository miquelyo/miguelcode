import React from "react"
import { AnimateWords } from "./AnimateWords"
import { motion } from "framer-motion"

export default function HeroText() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="relative flex flex-col items-center justify-center">
        <AnimateWords
          title="MIQUEL YOSAFAT"
          style="inline-block overflow-hidden pt-1 -mr-4 sm:-mr-5 md:-mr-7 lg:-mr-9 -mb-1 sm:-mb-2 md:-mb-3 lg:-mb-4"
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
          className="mt-6 max-w-2xl text-center text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl"
        >
          Crafting fast, accessible, and delightful web experiences.
        </motion.p>
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{
            opacity: 1,
            y: 0,
            transition: { delay: 1.4, duration: 0.8 },
          }}
          className="mt-8 flex items-center gap-3 sm:gap-4"
        >
          <a
            href="#projects"
            className="rounded-full bg-zinc-900 px-6 py-2.5 text-base font-medium text-white transition-colors hover:bg-zinc-800 dark:bg-zinc-100 dark:text-zinc-900 dark:hover:bg-zinc-200"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="rounded-full border border-zinc-300 px-6 py-2.5 text-base font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Contact Me
          </a>
        </motion.div>
      </div>
    </div>
  )
}
