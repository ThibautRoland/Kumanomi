import { Pool, QueryResult } from "pg"
import initPool from "./initPool"

class ProjectsRepository {
    private pool: Pool

    constructor() {
        this.pool= initPool()
    }

    getAllProjects(): Promise<QueryResult> {

        const query = "SELECT id, name, description, deadline, user_admin_id FROM projects;"

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

export default new ProjectsRepository();