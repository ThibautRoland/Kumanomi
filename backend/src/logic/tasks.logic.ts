import { QueryResult } from "pg";
import { createTask, patchTask, task, userTask } from "../models/types/Task";
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

function deleteTask(taskId: number): Promise<boolean> {
    return new Promise(async (resolve, reject) => {
        try {
            const res = await tasksRepo.deleteTask(taskId)
            // nothing deleted
            if (res.rowCount != 1) {
                resolve(false)
            }

            resolve(true)
        } catch (error) {
            reject(error)
        }
    })
}

function patchTaskStatus(taskId: number, body: {status_id: number}): Promise<{status_id: number}> {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await tasksRepo.patchTaskStatus(taskId, body)
            const patchedTask = result.rows[0]
            resolve({status_id: patchedTask.status_id})
        } catch (error) {
            reject(error)
        }
    })
}

function getUserTasks(userId: number): Promise<userTask[] | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const tasks = await tasksRepo.getUserTasks(userId)
            if (tasks.rows.length < 0) {
                resolve(null)
            }
            resolve(tasks.rows)
        } catch (error) {
            reject(error)
        }
    })
}

function patchTask(taskId: number, body: patchTask): Promise<QueryResult> {
    return new Promise(async (resolve, reject) => {
        try {
            const result = await tasksRepo.patchTask(taskId, body)
            resolve(result)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectTasks,
    createTask,
    deleteTask,
    patchTaskStatus,
    getUserTasks,
    patchTask
}