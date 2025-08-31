import { projects } from "@/lib/projectData"
import WebProjectCard from "./WebProjectCard"
import ProjectTitleAnimate from "./ProjectTitleAnimate"
import ProjectButton from "./ProjectButton"

export default function Projects() {
  return (
    <section
      id="projects"
      className="mx-auto flex w-[92%] sm:w-[90%] flex-col items-center justify-center lg:max-w-[1212.8px] z-[20] mt-16 sm:mt-20 md:mt-24"
    >
      <ProjectTitleAnimate />
      
      <div className="w-full">
        <div className="space-y-12">
          {projects.map((project, index) => (
            <WebProjectCard
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
      </div>
      
      <ProjectButton />
    </section>
  )
}
