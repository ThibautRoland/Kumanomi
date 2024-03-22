import { NextFunction, Request, Response } from 'express';


export function isProjectManager(req: Request, res: Response, next: NextFunction) {
  const role = req.header('role');

  if (!role) {
    return res.sendStatus(401);
  }

  if (role !== 'manager') {
    return res.status(403).json("you are not allowed")
  }

  next();
}