import { Request, Response } from "express";
import { RequestLogin } from "../models/types/RequestLogin";
const tasksLogic = require('../logic/tasks.logic');

export default class TasksController {

  async getProjectTasks(req: Request, res: Response) {
    const projectId = req.params.projectId;

    try {
      const tasks = await tasksLogic.getProjectTasks(projectId)
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json({ error: 'error => '+error });
    }
  
  }

  async createTask(req: Request, res: Response) {
    const projectId = req.params.projectId;
    const body = req.body;

    try {
      const taskId = await tasksLogic.createTask(projectId, body)
      return res.status(201).json({ taskId: taskId })
    } catch (error) {
      return res.status(500).json({ error: error})
    }
  }
}
