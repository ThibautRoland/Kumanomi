import { Request, Response } from "express";
import { ProjectMember } from "../models/types/ProjectMember";
const projectMembersLogic = require('../logic/projectMembers.logic');
const projectsLogic = require('../logic/projects.logic');

export default class ProjectMembersController {

  async getProjectMember(req: Request, res: Response) {
    const userId = req.params.userId;
    const projectId = req.params.projectId;

    try {
        const projectMember = await projectMembersLogic.getProjectMember(userId, projectId)
        if (!projectMember) {
          return res.status(404).json(`projectMember with userID ${userId} and projectId ${projectId} was not found`)
        }
        return res.status(200).json(projectMember as ProjectMember)
    } catch(error) {
        return res.status(500).json({ error: 'error => '+error });
    }
  }

  async getAllProjectMembers(req: Request, res: Response) {
    const projectId = req.params.projectId;

    try {
        const project = await projectsLogic.getProjectByID(projectId)
        if (project == null) {
          return res.status(404).json(`project with id ${projectId} doesn't appear in the database`)
        }

        const projectMembers = await projectMembersLogic.getAllProjectMembers(projectId)
        if (projectMembers.rowCount < 1) {
          return res.status(404).json([])
        }
        return res.status(200).json(projectMembers.rows as ProjectMember[])
    } catch(error) {
        return res.status(500).json({ error: error });
    }
  }
}
