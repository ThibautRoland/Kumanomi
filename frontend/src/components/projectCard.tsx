import { projectType } from "@/interfaces/projects"

type projectProps = {
    project: projectType
}

export const ProjectCard = ({project}: projectProps) => {
    return     <div className="flex flex-col bg-slate-100 p-10">
    <p>project_id: {project.id}</p>
    <p>{project.name}</p>
    <p>{project.description}</p>
    <p>deadline: {project.deadline.toString()}</p>
    <p>user_admin_id: {project.user_admin_id}</p>
</div>
}