import { NextFunction, Request, Response } from 'express';
const projectMembersLogic = require('../logic/projectMembers.logic');

export async function isProjectManager(req: Request, res: Response, next: NextFunction) {
  const userId = req.jwtPayload.id
  const projectId = req.params.projectId
  const response = await projectMembersLogic.getProjectMember(userId, projectId)
  console.log("from isProjectManager, res -> ", response)

  if (!response) {
    return res.sendStatus(401);
  }

  if (response.role !== 'manager') {
    return res.status(403).json("you are not allowed")
  }

  next();
}