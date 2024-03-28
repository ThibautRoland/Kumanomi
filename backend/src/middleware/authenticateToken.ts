import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const secretKeyJwt = process.env.SECRET_KEY_JWT

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  //const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

 

  jwt.verify(token, secretKeyJwt, (err, jwtPayload) => {
    console.log("from authenticateToken", jwtPayload)
    if (err) {
      return res.sendStatus(403);
    }

    if (!jwtPayload) {
      return res.sendStatus(500)
    }


    req.jwtPayload = jwtPayload;
    next();
  });
}
