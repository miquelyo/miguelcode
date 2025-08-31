import React from "react"
import { Separator } from "../ui/separator"

interface NavMenuLineProps {
  title: string
}

export default function NavMenuLine({ title }: NavMenuLineProps) {
  return (
    <div className="px-[clamp(1.25rem,3vw,2.5rem)]">
      <span className="text-xl font-semibold text-zinc-800 dark:text-zinc-100">
        {title}
      </span>
      <Separator className="mt-2 mb-2 bg-zinc-800/25 dark:bg-zinc-200/25" />
    </div>
  )
}
