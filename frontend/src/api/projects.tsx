import { projectType } from "@/interfaces/projects"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function getAllProjectsFromApi(token: string) : Promise<projectType[] | null> {

    const url = `http://${API_HOST}:${API_PORT}/projects/`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type':'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        if (res.status === 200) {
            return await res.json() as projectType[]
        }        

        return null
    } catch (error){
        console.log("error from getAllProjectsFromApi -> ", error)
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
        return res   
    } catch (error){
        console.log("getProjectByID -> ",error)
       return null 
    }
}
