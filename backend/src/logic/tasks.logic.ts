import { createTask, task } from "../models/types/Task";
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

function createTask(projectId: number, body: createTask): Promise<number> {
    return new Promise(async (resolve, reject) => {
        try {
            const taskId = await tasksRepo.createTask(projectId, body)
            if (taskId.rowCount !== 1) {
                console.log("should had one id returned from saving but got "+ taskId.rowCount)
                resolve(-1)
            }
            resolve(taskId.rows[0].id)
        } catch (error) {
            reject(error)
        }
    })
}

function deleteTask(taskId: number): Promise<string> {
    return new Promise(async (resolve, reject) => {
        try {
            await tasksRepo.deleteTask(taskId)
            resolve(`task with id ${taskId} has been successfully deleted`)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectTasks,
    createTask,
    deleteTask
}