import { ProjectMember } from "@/interfaces/projectMember"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function getProjectMemberFromApi(userId: number, projectId: number, token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/project-members/${userId}/${projectId}`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        
        return res   
    } catch (error){
        console.log("getProjectMemberFromApi -> ",error)
        return null 
    }
}

export async function getAllProjectMembersFromApi(projectId: number, token: string) : Promise<Response | null> {

    const url = `http://${API_HOST}:${API_PORT}/project-members/${projectId}`

    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: {'Content-Type':'application/json', 'Authorization': `Bearer ${token}`},
        })
        
        return (res.status === 200) ? res.json() : []  
    } catch (error){
        console.log("getAllProjectMembersFromApi -> ",error)
        return null 
    }
}
