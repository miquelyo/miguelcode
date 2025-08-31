"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { FiGithub, FiExternalLink } from "react-icons/fi"

interface WebProjectCardProps {
  title: string
  description: string
  image: string
  tech: string[]
  repo: string
  projectLink: string
}

export default function WebProjectCard({
  title,
  description,
  image,
  tech,
  repo,
  projectLink
}: WebProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="group relative bg-zinc-50 dark:bg-zinc-900 rounded-xl p-6 hover:shadow-xl transition-shadow duration-300"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </div>
        <div className="flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold mb-3">{title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 mb-4">{description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tech.map((item, index) => (
                <span
                  key={index}
                  className="px-3 py-1 text-sm rounded-full bg-zinc-200 dark:bg-zinc-800"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          <div className="flex gap-4">
            <a
              href={repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            >
              <FiGithub className="w-5 h-5" />
              Source Code
            </a>
            <a
              href={projectLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm hover:text-blue-500 transition-colors"
            >
              <FiExternalLink className="w-5 h-5" />
              Live Demo
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
