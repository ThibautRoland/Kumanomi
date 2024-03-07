import { Project } from "../interfaces/Project";
import projectsRepo from "../repositories/projects.repository";

function getAllProjects(): Promise<any> {
    return new Promise(async (resolve, reject) => {
        try {
            const projects = await projectsRepo.getAllProjects()
            resolve(projects.rows)
        } catch (error) {
            reject(error)
        }
    })
}

function getProjectByID(id : number): Promise<Project | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const projects = await projectsRepo.getProjectByID(id)
            if (projects.rows.length<1) {
                resolve( null )
            }
            resolve(projects.rows[0] as Project)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getAllProjects,
    getProjectByID
}