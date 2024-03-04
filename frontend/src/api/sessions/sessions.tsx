import { loginRequest, tasksRequest } from "@/interfaces/sessions"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function loginApi(loginData: loginRequest) : Promise<string | null> {

    const url = `http://${API_HOST}:${API_PORT}/sessions/login`

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {'Content-Type':'application/json'},
        })
        if (res.status == 200) {
            return await res.json() as string
        }        

        return ""
    } catch (error){
        console.log(error)
       return null 
    }
}



export async function getTasksApi(taskRequest: tasksRequest) : Promise<any> {

    /*const url = `http://${API_HOST}:${API_PORT}/${taskRequest.id}/tasks`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${taskRequest.token}`},
        })
        const canConnect = await res.json() as boolean
        return canConnect
    } catch (error){
        console.log(error)
       return null 
    }*/
    return {
        "task1" : "haaaa"
    }
}
