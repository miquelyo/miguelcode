"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import HeroText from "./HeroText"

export default function Hero() {

  return (
    <motion.section
      id="hero"
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden"
      initial="initial"
      animate="animate"
    >
      {/* Background Image Container */}
      <motion.div
        className="absolute inset-0 -z-10"
        initial={{ x: "-100%", opacity: 0 }}   // mulai dari kiri & transparan
        animate={{ x: "0%", opacity: 1 }}     // geser ke posisi normal & fade in
        transition={{ duration: 1.2, ease: "easeOut" }} // durasi animasi
      >
        {/* Dark mode image */}
        <Image
          src="/images/bg2.png"
          alt="Background Dark"
          fill
          priority
          sizes="100vw"
          className="hidden dark:block object-cover 
            object-[20%_center] xs:object-[25%_center] sm:object-[35%_center] md:object-center"
          quality={100}
        />
        {/* Light mode image */}
        <Image
          src="/images/bg3.png"
          alt="Background Light"
          fill
          sizes="100vw"
          className="block dark:hidden object-cover 
            object-[20%_center] xs:object-[25%_center] sm:object-[35%_center] md:object-center"
          quality={100}
        />
      </motion.div>

      {/* Content */}
      <div className="relative z-20 w-full">
        <HeroText />
      </div>
    </motion.section>
  )
}
