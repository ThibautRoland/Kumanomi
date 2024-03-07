import { project } from "@/interfaces/project"
import { loginRequest, userAuth} from "@/interfaces/sessions"
import { task } from "@/interfaces/tasks"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function loginApi(loginData: loginRequest) : Promise<userAuth | null> {

    const url = `http://${API_HOST}:${API_PORT}/sessions/login`

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {'Content-Type':'application/json'},
        })
        if (res.status == 200) {
            return await res.json() as userAuth
        }        

        return {
            token: "",
            id: 0
        }
    } catch (error){
        console.log("error from loginApi", error)
       return null 
    }
}

export async function getProtectedEndpoint(token : string) : Promise<any> {

    const url = `http://${API_HOST}:${API_PORT}/api`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        if (res.status !== 200) {
            return { message : "ça marche pas"} 
        }
        const welcomeMsg = await res.json() as string
        return welcomeMsg
    } catch (error){
        console.log(error)
       return error 
    }
}

export async function getTasksApi(token: string) : Promise<any> {

    const url = `http://${API_HOST}:${API_PORT}/sessions/tasks`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        if (res.status !== 200) {
            return [{ 
                id: 0,
                name: "Not a task"
            }]
        }
        const tasks = await res.json() as task[]
        return tasks
    } catch (error){
        console.log("error from getTasksApi",error)
       return null 
    }
}

export async function getProjectByID(projectID: number ,token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/projects/${projectID}`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })

        console.log()

        return res
        
    } catch (error){
        console.log("error from getTasksApi",error)
       return null 
    }
}


function aa (){

}
