import { ProjectMember } from "../models/types/ProjectMember";
import projectMembersRepo from "../repositories/projectMembers.repository";


function getProjectMember(userId : number, projectId: number): Promise<ProjectMember | null> {
    return new Promise(async (resolve, reject) => {
        try {
            const projectMember = await projectMembersRepo.getProjectMember(userId, projectId)
            if (projectMember.rows.length<1) {
                resolve( null )
            }
            resolve(projectMember.rows[0] as ProjectMember)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectMember
}