import { User } from "./user";

export interface BaseProject {
    name: string,
    description: string,
    deadline: Date,
    userAdmin: User
}

export interface Project extends BaseProject {
    id: number;
}