"use client"

import { motion } from "framer-motion"
import AnimateTitle from "./AnimateTitle"
import GithubGraph from "./GithubGraph"
import Spotify from "./Spotify"
import { Box, Code2, FileCode2, Layers, Monitor, Palette, Video, Music4, GitBranch, Github, Figma, Briefcase, Rocket, Award, Globe2 } from "lucide-react"

export default function About() {
  const skills = {
    "Frontend Development": [
      "React.js", "Next.js", "TypeScript", 
      "TailwindCSS", "HTML5", "CSS3",
      "JavaScript", "Responsive Design"
    ],
    "Video Editing": [
      "Adobe Premiere Pro", "Adobe After Effects",
      "Video Production", "Color Grading",
      "Motion Graphics", "Audio Editing"
    ],
    "Tools & Software": [
      "Git", "VS Code", "Figma",
      "Adobe Creative Suite", "DaVinci Resolve",
      "Final Cut Pro"
    ]
  }

  const iconMap: Record<string, JSX.Element> = {
    "React.js": <Code2 className="h-4 w-4" />,
    "Next.js": <Code2 className="h-4 w-4" />,
    "TypeScript": <FileCode2 className="h-4 w-4" />,
    "TailwindCSS": <Layers className="h-4 w-4" />,
    "HTML5": <FileCode2 className="h-4 w-4" />,
    "CSS3": <Palette className="h-4 w-4" />,
    "JavaScript": <FileCode2 className="h-4 w-4" />,
    "Responsive Design": <Monitor className="h-4 w-4" />,
    "Adobe Premiere Pro": <Video className="h-4 w-4" />,
    "Adobe After Effects": <Video className="h-4 w-4" />,
    "Video Production": <Video className="h-4 w-4" />,
    "Color Grading": <Palette className="h-4 w-4" />,
    "Motion Graphics": <Layers className="h-4 w-4" />,
    "Audio Editing": <Music4 className="h-4 w-4" />,
    "Git": <GitBranch className="h-4 w-4" />,
    "VS Code": <FileCode2 className="h-4 w-4" />,
    "Figma": <Figma className="h-4 w-4" />,
    "Adobe Creative Suite": <Palette className="h-4 w-4" />,
    "DaVinci Resolve": <Video className="h-4 w-4" />,
    "Final Cut Pro": <Video className="h-4 w-4" />,
    "Github": <Github className="h-4 w-4" />,
  }
  const getIcon = (name: string) => iconMap[name] ?? <Box className="h-4 w-4" />

  return (
    <section
      id="about"
      className="relative mb-10 mt-4 w-full overflow-hidden py-16 sm:py-20"
    >
      <div className="mx-auto w-[92%] sm:w-[90%] lg:max-w-[1212.8px]">
        {/* Header */}
        <AnimateTitle
          title={"About me"}
          className="mb-12 text-left text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          wordSpace="mr-[14px]"
          charSpace="mr-[0.0001em]"
        />

        {/* Main Content Grid */}
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column - About Text */}
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 text-justify"
            >
              <p>
                Hi! I&apos;m Miguel, a versatile creative professional with dual expertise in Frontend Web Development and Video Editing. My passion lies in crafting engaging digital experiences through code and visual storytelling.
              </p>
              <p>
                As a Frontend Developer, I specialize in building modern and responsive web applications using cutting-edge technologies. I combine clean code practices with intuitive user interfaces to create seamless web experiences that users love.
              </p>
              <p>
                Additionally, my background in video editing allows me to bring stories to life through compelling visual narratives. I blend technical precision with creative vision to produce engaging content that captures and maintains audience attention.
              </p>
              <p>
                This unique combination of technical development skills and creative media expertise enables me to bring a holistic perspective to every project, whether I&apos;m crafting interactive web experiences or producing captivating video content.
              </p>
            </motion.div>
          </div>

          {/* Right Column - Skills */}
          <div className="space-y-12">
            {/* Skills Title */}
            <AnimateTitle
              title={"Skills"}
              className="mb-8 text-left text-3xl font-bold tracking-tight sm:text-4xl"
              wordSpace="mr-[14px]"
              charSpace="mr-[0.0001em]"
            />
            
            {/* Skills Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-8"
            >
              {Object.entries(skills).map(([category, items]) => (
                <div key={category} className="space-y-3 rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/40 dark:bg-zinc-800/40 backdrop-blur p-5">
                  <h3 className="text-lg font-semibold">{category}</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mt-2">
                    {items.map((skill) => (
                      <button
                        key={skill}
                        className="group inline-flex items-center gap-2 rounded-md border border-zinc-200/60 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-800/70 px-3 py-2 text-sm text-zinc-800 dark:text-zinc-200 shadow-sm transition hover:shadow-md hover:-translate-y-0.5 hover:bg-white/90 dark:hover:bg-zinc-800"
                        type="button"
                        aria-label={skill}
                      >
                        <span className="inline-flex h-6 w-6 items-center justify-center rounded-md bg-zinc-100 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200">
                          {getIcon(skill)}
                        </span>
                        <span>{skill}</span>
                      </button>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>

                      </div>
        </div>

        {/* Activity Section */}
        <div className="mt-16 space-y-8">
          <GithubGraph />
          <div className="grid gap-6 lg:grid-cols-2">
            <Spotify />
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="rounded-2xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/40 dark:bg-zinc-900/40 backdrop-blur p-6"
            >
              <h3 className="mb-4 text-lg font-semibold">Highlights</h3>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-2">
                <div className="group flex items-center gap-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-800/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
                    <Briefcase className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Experience</p>
                    <p className="text-sm font-semibold">3+ Years</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-800/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
                    <Rocket className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Projects</p>
                    <p className="text-sm font-semibold">25+ Shipped</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-800/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
                    <Award className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Quality</p>
                    <p className="text-sm font-semibold">Pixel-perfect UI</p>
                  </div>
                </div>
                <div className="group flex items-center gap-3 rounded-xl border border-zinc-200/60 dark:border-zinc-700/50 bg-white/70 dark:bg-zinc-800/70 p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700 dark:bg-zinc-700 dark:text-zinc-100">
                    <Globe2 className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">Availability</p>
                    <p className="text-sm font-semibold">Remote Friendly</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
