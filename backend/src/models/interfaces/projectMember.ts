import { Project } from "./project";
import { Role } from "./role";
import { User } from "./user";

export interface BaseProjectMember {
    project: Project,
    user: User,
    role: Role
}

export interface ProjectMember extends BaseProjectMember {
    id: number;
}