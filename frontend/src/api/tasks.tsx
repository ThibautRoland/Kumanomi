import { createTask, task } from "@/interfaces/tasks"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function getProjectTasksFromApi(projectID: number, token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/projects/${projectID}/tasks`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        return (res.status === 200) ? res.json() : null
    } catch (error){
        console.log("getProjectTasksFromApi error -> ",error)
       return null 
    }
}

export async function createProjectTask(projectID: number, token: string, task: createTask, role: string) : Promise<boolean> {

    const url = `http://${API_HOST}:${API_PORT}/projects/${projectID}/new-task`

    try {
        const res = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${token}`,
                'role': role
            },
            body: JSON.stringify(task)
        })
        return res.status === 201   
    } catch (error){
        console.log("createProjectTask error -> ",error)
       return false 
    }
}

export async function patchTaskStatus(taskId: number, token: string, key: string) : Promise<boolean> {

    var status_id = 0;
    if (key === "pending") { status_id = 1 }
    if (key === "in-progress") { status_id = 2 }
    if (key === "blocked") { status_id = 3 }
    if (key === "done") { status_id = 4 }
    if (!(["pending", "in-progress", "blocked", "done"].includes(key))) {
        return false
    }

    const body: {status_id: number} = {status_id: status_id}

    const url = `http://${API_HOST}:${API_PORT}/tasks/${taskId}`

    try {
        const res = await fetch(url, {
            method: 'PATCH',
            headers: {
                'Content-Type':'application/json', 
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(body)
        })
        return res.status === 200 
    } catch (error){
        console.log("createProjectTask error -> ",error)
       return false 
    }
}

export async function getUserTasksFromApi(userId: number, token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/tasks/user/${userId}`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        return (res.status === 200) ? res.json() : null
    } catch (error){
        console.log("getUserTasksFromApi error -> ",error)
       return null 
    }
}

export async function deleteTask(taskId: number, token: string) : Promise<boolean> {

    const url = `http://${API_HOST}:${API_PORT}/tasks/${taskId}`

    try {
        const res = await fetch(url, {
            method: 'DELETE',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        return res.status === 204
    } catch (error){
        console.log("deleteTask error -> ",error)
       return false 
    }
}