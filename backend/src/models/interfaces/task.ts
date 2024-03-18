import { Project } from "./project";
import { ProjectMember } from "./projectMember";
import { Status } from "./status";

export interface BaseTask {
    description: string,
    deadline: Date,
    project: Project,
    status: Status,
    priority: number,
    projectMember: ProjectMember | null
}

export interface Task extends BaseTask {
    id: number;
}