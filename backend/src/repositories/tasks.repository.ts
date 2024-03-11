import { Pool, QueryResult } from "pg"
import initPool from "./initPool"

class TasksRepository {
    private pool: Pool

    constructor() {
        this.pool= initPool()
    }

    getProjectTasks(id: number): Promise<QueryResult> {
        const sql = "SELECT tasks.id, tasks.description, tasks.deadline, tasks.priority, projects.name, task_status.status, roles.role as assigned_user_role, users.first_name as assigned_user_first_name, users.last_name as assigned_user_last_name \
            FROM tasks \
            LEFT JOIN projects ON projects.id = tasks.project_id \
            LEFT JOIN task_status ON tasks.status_id = task_status.id \
            LEFT JOIN project_members ON tasks.project_member_id = project_members.id \
            LEFT JOIN roles ON roles.id = project_members.role_id \
            LEFT JOIN users ON project_members.user_id = users.id \
            WHERE projects.id = ($1);"

        const values = [id]
        
        const query = {
            text: sql,
            values: values
        }

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

export default new TasksRepository();