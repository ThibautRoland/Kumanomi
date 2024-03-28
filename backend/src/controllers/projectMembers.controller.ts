import { Request, Response } from "express";
import { ProjectMember } from "../models/types/ProjectMember";
const projectMembersLogic = require('../logic/projectMembers.logic');

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
}
