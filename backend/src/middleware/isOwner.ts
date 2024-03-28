import { NextFunction, Request, Response } from 'express';

export function isOwner(req: Request, res: Response, next: NextFunction) {
  const userIdAgent = req.jwtPayload.id;
  const userIdTarget = parseInt(req.params.userId, 10);

  if (userIdAgent !== userIdTarget) {
    return res.status(403).json("You are not allowed")
  }

  next()
}