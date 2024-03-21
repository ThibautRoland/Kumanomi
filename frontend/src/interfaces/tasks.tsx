export type task = {
    id: number,
    name: string,
    description: string,
    deadline: Date,
    priority: number,
    status: string,
    assigned_user_role: string,
    assigned_user_first_name: string,
    assigned_user_last_name: string
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
