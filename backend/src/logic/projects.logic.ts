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

module.exports = {
    getAllProjects
}