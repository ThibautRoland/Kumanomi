export type task = {
    description: string,
    deadline: Date,
    projectId: number,
    statusId: number,
    priority: number,
    projectMemberId: number | null
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