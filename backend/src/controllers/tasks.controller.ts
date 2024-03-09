import { Request, Response } from "express";
import { RequestLogin } from "../interfaces/RequestLogin";
const tasksLogic = require('../logic/tasks.logic');

export default class TasksController {

  async tasks(req: Request, res: Response) {

      return res.status(200).json( [
        {
          id : 1,
          name : "task 1"
        },
        {
          id : 2,
          name : "task 2"
        },
        {
          id : 3,
          name : "task 3"
        }
      ])  
  }

  async getProjectTasks(req: Request, res: Response) {
    const projectId = req.params.projectId;

    try {
      const tasks = await tasksLogic.getProjectTasks(projectId)
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json({ error: 'error => '+error });
    }
  
  }
}
