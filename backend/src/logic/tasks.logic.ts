import { task } from "../models/types/Task";
import tasksRepo from "../repositories/tasks.repository";

function getProjectTasks(projectId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const tasks = await tasksRepo.getProjectTasks(projectId)
            if (tasks.rows.length < 0) {
                resolve(null)
            }
            resolve(tasks.rows)
        } catch (error) {
            reject(error)
        }
    })
}

function createTask(projectId: number, body: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const taskId = await tasksRepo.createTask(projectId, body)
            resolve(taskId)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectTasks,
    createTask
}