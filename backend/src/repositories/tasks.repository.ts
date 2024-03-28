import { Pool, QueryResult } from "pg"
import initPool from "./initPool"
import { createTask } from "../models/types/Task"

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

    createTask(projectId: number, body: createTask): Promise<QueryResult> {
        const query = 'INSERT INTO tasks (description, deadline, project_id, status_id, priority, project_member_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id;';
        const values = [body.description, body.deadline, projectId, 1, body.priority, null]

        console.log(query, "values are -> ", values)

        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (error: Error, result: QueryResult) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    deleteTask(taskId: number): Promise<QueryResult> {
        const query = "DELETE FROM tasks WHERE id = ($1);"
        
        return new Promise((resolve, reject) => {
            this.pool.query(query, [taskId], (error: Error, result: QueryResult) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    patchTaskStatus(taskId: number, body: {status_id: number}): Promise<QueryResult> {
        const query = "UPDATE tasks SET status_id = ($1) WHERE id = ($2) RETURNING status_id;"
        const values = [body.status_id, taskId]
        
        return new Promise((resolve, reject) => {
            this.pool.query(query, values, (error: Error, result: QueryResult) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

    getUserTasks(userId: number): Promise<QueryResult> {
        const sql = "SELECT tasks.id, tasks.description, tasks.deadline, tasks.priority, projects.name as projectname, tasks.project_id as projectId, task_status.status \
        FROM tasks \
        LEFT JOIN projects ON projects.id = tasks.project_id \
        LEFT JOIN task_status ON tasks.status_id = task_status.id \
        LEFT JOIN project_members ON tasks.project_member_id = project_members.id \
        LEFT JOIN users ON project_members.user_id = users.id \
        WHERE users.id = ($1);"

        const values = [userId]
        
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