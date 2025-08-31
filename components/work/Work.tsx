"use client"

import { motion } from "framer-motion"
import Image from "next/image"

export type WorkItem = {
  company: string
  role: string
  period: string
  location?: string
  description?: string
  tags?: string[]
  link?: string
  logo?: string // tambahin logo
}

const workData: WorkItem[] = [
  {
    company: "Balai Monitor Spektrum Frekuensi Radio Kelas II Palu",
    role: "PPNPN (Pekerja Pemerintah Non Pegawai Negeri)",
    period: "Jun 2024 - Present",
    location: "Palu, ID",
    description:
      "Sebagai Content Creator, saya bertanggung jawab untuk membuat konten video yang informatif dan menarik tentang pengelolaan spektrum frekuensi radio, serta membantu meningkatkan kesadaran masyarakat mengenai pentingnya regulasi frekuensi radio.",
    tags: ["VN", "Capcut", "Adobe Premier Pro", "Canva"],
    link: "#",
    logo: "/images/komdigi.png", // simpan di public/logos
  },
  {
    company: "PT GEMILANG MEDIA WISATAMA (Travelxism)",
    role: "Frontend Developer & Quality Assurance",
    period: "Aug 2022 - Dec 2022",
    location: "Yogyakarta, ID",
    description:
      "Membangun tampilan website yang responsif dan memastikan kualitas aplikasi melalui pengujian agar aman, bebas bug, dan sesuai kebutuhan pengguna.",
    tags: ["Laravel", "Figma", "Google Lighthouse", "CSS"],
    link: "#",
    logo: "/images/travelxism.png",
  },
]

const containerVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.2, 0.65, 0.3, 0.9] },
  },
}

const listVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
}

export default function Work() {
  return (
    <section
      id="work"
      className="relative mb-10 flex min-h-[60vh] w-full items-center justify-center overflow-hidden"
    >
      <div className="mx-auto flex w-[92%] sm:w-[90%] flex-col items-start justify-center lg:max-w-[1212.8px]">
        {/* Title */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
          className="mb-8 sm:mb-10 md:mb-16 flex w-full items-center justify-start gap-x-2"
        >
          <h2 className="text-left text-[40px] font-bold leading-[0.9em] tracking-tighter sm:text-[45px] md:text-[60px] lg:text-[80px]">
            Work Experience
          </h2>
        </motion.div>

        {/* Timeline/List */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          variants={listVariants}
          className="relative w-full"
        >
          {/* Gradient timeline line */}
          <div className="absolute left-3 top-0 bottom-0 hidden md:block">
            <div className="h-full w-[2px] bg-gradient-to-b from-transparent via-zinc-300 to-transparent dark:via-zinc-700" />
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            {workData.map((item, idx) => (
              <motion.div
                key={`${item.company}-${idx}`}
                variants={itemVariants}
                className="group relative md:ml-6"
              >
                {/* glow ring on hover */}
                <div className="pointer-events-none absolute -inset-0.5 -z-10 rounded-2xl opacity-0 blur transition duration-300 group-hover:opacity-100 group-hover:bg-gradient-to-r group-hover:from-indigo-500/20 group-hover:to-cyan-500/20" />

                <div className="relative rounded-2xl border border-zinc-300/70 bg-white/60 p-5 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-lg dark:border-zinc-700/70 dark:bg-zinc-900/40">
                  {/* Timeline dot (desktop) */}
                  <span className="absolute left-[-0.625rem] top-6 hidden h-3 w-3 -translate-x-1/2 rounded-full border border-zinc-300 bg-white shadow-sm dark:border-zinc-600 dark:bg-zinc-900 md:block" />

                  <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between">
                    <div className="flex items-center gap-2 flex-wrap">
                      {item.logo && (
                        <Image
                          src={item.logo}
                          alt={item.company}
                          width={28}
                          height={28}
                          className="rounded-md object-contain"
                        />
                      )}
                      {item.link ? (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noreferrer"
                          className="text-lg font-semibold text-zinc-900 hover:underline dark:text-zinc-100"
                        >
                          {item.company}
                        </a>
                      ) : (
                        <span className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                          {item.company}
                        </span>
                      )}
                      <span className="text-zinc-500">•</span>
                      <span className="text-base font-medium text-zinc-700 dark:text-zinc-300">
                        {item.role}
                      </span>
                    </div>
                    <div className="text-sm text-zinc-500 dark:text-zinc-400">
                      {item.period}
                      {item.location ? (
                        <>
                          <span className="mx-1">•</span>
                          <span>{item.location}</span>
                        </>
                      ) : null}
                    </div>
                  </div>

                  {item.description ? (
                    <p className="mt-2 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                      {item.description}
                    </p>
                  ) : null}

                  {item.tags && item.tags.length > 0 ? (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span
                          key={`${item.company}-${tag}`}
                          className="rounded-full border border-zinc-300 bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700 transition-colors hover:bg-white dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-300 dark:hover:bg-zinc-900/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
