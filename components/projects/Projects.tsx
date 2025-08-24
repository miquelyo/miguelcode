import { projects } from "@/lib/projectData"
import ProjectCard from "./ProjectCard"
import ProjectTitleAnimate from "./ProjectTitleAnimate"
import ProjectButton from "./ProjectButton"

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto flex w-[92%] sm:w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px] z-[20] mt-16 sm:mt-20 md:mt-24"
    >
      <ProjectTitleAnimate />
      <div className="mb-16 sm:mb-20 md:mb-24 grid w-full grid-cols-1 grid-rows-2 gap-x-6 gap-y-6 lg:max-w-[1200px] lg:grid-cols-1">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            title={project.title}
            description={project.description}
            image={project.image}
            tech={project.tech}
            repo={project.repo}
            projectLink={project.linkProject}
          />
        ))}
      </div>
      <ProjectButton />
    </section>
  )
}
