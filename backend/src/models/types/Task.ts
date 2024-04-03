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

export type patchTask = {
    description: string | null,
    deadline: Date | null,
    priority: number | null,
    status_id: number | null,
    project_member_id: number | null
}