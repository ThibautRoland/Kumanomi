import { loginRequest } from "@/interfaces/sessions"

const API_HOST = process.env.API_HOST
const API_PORT = process.env.API_PORT

export async function loginApi(loginData: loginRequest) : Promise<boolean | null> {

    const url = `http://${API_HOST}:${API_PORT}/sessions/login`

    try {
        const res = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(loginData),
            headers: {'Content-Type':'application/json'},
        })
        const canConnect = await res.json() as boolean
        return canConnect
    } catch (error){
        console.log(error)
       return null 
    }
}