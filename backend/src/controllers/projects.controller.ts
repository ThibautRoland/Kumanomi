import { Request, Response } from "express";
import { RequestLogin } from "../interfaces/RequestLogin";
const projectsLogic = require('../logic/projects.logic');

export default class ProjectsController {

  async getAllProjects(req: Request, res: Response) {
    try {
        const projects = await projectsLogic.getAllProjects()
        return res.status(200).json(projects)
    } catch(error) {
        return res.status(500).json({ error: 'error => '+error });
    }
  }

}
