import { Request, Response } from "express";
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

  async getProjectById(req: Request, res: Response) {
    const projectId = req.params.projectId;

    try {
        const project = await projectsLogic.getProjectByID(projectId)
        
        if (project == null){
          console.log(project)
          return res.sendStatus(404)
        }
        return res.status(200).json(project)
    } catch(error) {
        return res.status(500).json({ error: 'error => '+error });
    }
  }

}
