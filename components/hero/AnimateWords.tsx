"use client"

import { motion, useInView, useScroll, useTransform } from "framer-motion"
import { useEffect, useRef } from "react"
import { useAnimation } from "framer-motion"

interface AnimateWordsProps {
  title: string
  style?: string
}

export const AnimateWords = ({ title, style = "" }: AnimateWordsProps) => {
  const ctrls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })
  const xLeft = useTransform(scrollYProgress, [0, 1], [-40, 40])
  const xRight = useTransform(scrollYProgress, [0, 1], [40, -40])

  useEffect(() => {
    if (inView) {
      ctrls.start("animate")
    }
  }, [ctrls, inView])

  const wordAnimation = {
    initial: { opacity: 0, y: 150 },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.8,
        ease: [0.2, 0.65, 0.3, 0.9],
        duration: 1,
      },
    },
  }

  return (
    <h1
      aria-label={title}
      role="heading"
      className="text-right text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[10rem] font-extrabold leading-[1.1] pt-2 text-zinc-800 dark:text-zinc-200"
    >
      <motion.span ref={ref} className="flex flex-col">
        {title.split(" ").map((word, index) => {
          const x = index % 2 === 0 ? xLeft : xRight
          return (
            <motion.div
              key={index}
              initial="initial"
              animate={ctrls}
              transition={{
                delayChildren: index * 0.25,
                staggerChildren: 0.05,
              }}
              style={{ x }}
              className="flex items-end justify-end"
            >
              <motion.span
                className={`inline-block ${style}`}
                variants={wordAnimation}
              >
                {word + "\u00A0"}
              </motion.span>
            </motion.div>
          )
        })}
      </motion.span>
    </h1>
  )
}
