export type task = {
    description: string,
    deadline: Date,
    projectId: number,
    statusId: number,
    priority: number,
    projectMemberId: number | null
}