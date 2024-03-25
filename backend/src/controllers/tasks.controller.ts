import { Request, Response } from "express";
import { RequestLogin } from "../models/types/RequestLogin";
import { createTask } from "../models/types/Task";
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
    const body = req.body as createTask;

    if (body.deadline === null || body.priority === null || body.description === null || body.description === "") {
      return res.status(422).json("error -> wrong data type or null value in the body")
    }

    try {
      const taskId = await tasksLogic.createTask(projectId, body)
      return res.status(201).json({ taskId: taskId })
    } catch (error) {
      return res.status(500).json({ error: error})
    }
  }

  async deleteTask(req: Request, res: Response) {
    const taskId = req.params.taskId;

    try {
      const taskSucessfulyDeleted = await tasksLogic.deleteTask(taskId)

      if (!taskSucessfulyDeleted){
        return res.status(404).json(`task with id ${taskId} was not found`)
      }

      return res.sendStatus(204)
    } catch (error) {
      return res.status(500).json({ error: error})
    }
  }

  async patchTaskStatus(req: Request, res: Response) {
    const taskId = req.params.taskId;
    const body = req.body as {status_id: number}

    try {
      const patchedTask = await tasksLogic.patchTaskStatus(taskId, body)
      return res.status(200).json({
        message: `task with id ${taskId} has been successfully patched`,
        id: taskId,
        status_id: patchedTask.status_id
      })
    } catch (error) {
      return res.status(500).json({ error: error})
    }
  }

  async getUserTasks(req: Request, res: Response) {
    const userId = req.params.userId;

    try {
      const tasks = await tasksLogic.getUserTasks(userId)
      if (tasks.length < 1) {
        return res.status(404).json(`no task is attributed to userId ${userId}`)
      }
      return res.status(200).json(tasks)
    } catch (error) {
      return res.status(500).json({ error: 'error => '+error });
    }

  }
}
