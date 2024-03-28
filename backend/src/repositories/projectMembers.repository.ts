import { Pool, QueryResult } from "pg"
import initPool from "./initPool"

class ProjectMembersRepository {
    private pool: Pool

    constructor() {
        this.pool= initPool()
    }

    getProjectMember(userId : number, projectId: number): Promise<QueryResult> {

        const sql = "SELECT project_members.id, first_name, role FROM project_members \
            JOIN users ON users.id = project_members.user_id \
            JOIN roles ON roles.id = project_members.role_id \
            WHERE user_id = ($1) \
            AND project_id = ($2);"

        
        const values = [userId, projectId]

        const query = {
          text: sql,
          values: values
        };
        return new Promise((resolve, reject) => {
            this.pool.query(query, (error: Error, result: QueryResult) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })


      
    }

}

export default new ProjectMembersRepository();