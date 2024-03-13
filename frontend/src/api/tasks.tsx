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