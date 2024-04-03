import { QueryResult } from "pg";
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

function getAllProjectMembers(projectId: number): Promise<QueryResult> {
    return new Promise(async (resolve, reject) => {
        try {
            const projectMembers = await projectMembersRepo.getAllProjectMembers(projectId)
            // if (projectMember.rows.length<1) {
            //     resolve( null )
            // }
            resolve(projectMembers)
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getProjectMember,
    getAllProjectMembers
}