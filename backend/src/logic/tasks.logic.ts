import { task } from "../interfaces/Task";
import tasksRepo from "../repositories/tasks.repository";

function getProjectTasks(projectId: number): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const tasks = await tasksRepo.getProjectTasks(projectId)
            if (tasks.rows.length < 0) {
                resolve(null)
            }
            resolve(tasks)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectTasks
}