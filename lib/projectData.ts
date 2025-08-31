interface Project {
  id: number
  slug: string
  title: string
  category: "Web Developer"
  description: string
  image: string
  tech: string[]
  linkProject: string
  repo: string
}

export const projects: Project[] = [
  {
    id: 0,
    slug: "coming-soon",
    title: "Coming Soon",
    category: "Web Developer",
    description:
      "Project masih dalam pengembangan. Nantikan segera!",
    image: "/images/coming-soon.png", // bisa bikin placeholder img
    tech: [],
    linkProject: "#",
    repo: "#",
  },
]
