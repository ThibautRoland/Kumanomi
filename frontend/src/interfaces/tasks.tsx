export type task = {
    id: number,
    name: string,
    description: string,
    deadline: Date,
    priority: number,
    status: string,
    assigned_user_role: string | null,
    assigned_user_first_name: string | null,
    assigned_user_last_name: string | null
}

export type tasksRequest = {
    id: number,
    token: string
}

export type createTask = {
    description: string,
    deadline: Date,
    priority: number
}

export type userTask = {
    id: number,
    description: string,
    deadline: Date,
    priority: number,
    projectName: string,
    projectId: number,
    status: string
}
