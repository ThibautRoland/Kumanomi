import { createTask } from "@/interfaces/tasks"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function getProjectTasksFromApi(projectID: number, token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/projects/${projectID}/tasks`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        return res   
    } catch (error){
        console.log("getProjectTasksFromApi error -> ",error)
       return null 
    }
}

export async function createProjectTask(projectID: number, token: string, task: createTask) : Promise<boolean> {

    const url = `http://${API_HOST}:${API_PORT}/projects/${projectID}/new-task`

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
            body: JSON.stringify(task)
        })
        return res.status === 201   
    } catch (error){
        console.log("createProjectTask error -> ",error)
       return false 
    }
}