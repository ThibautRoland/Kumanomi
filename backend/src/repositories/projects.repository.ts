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

    getProjectByID(id : number): Promise<QueryResult> {

        const sql = "SELECT id, name, description, deadline, user_admin_id FROM projects WHERE id = ($1) LIMIT 1;"

        
        const values = [id]

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

export default new ProjectsRepository();