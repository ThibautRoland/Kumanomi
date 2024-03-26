import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const SECRET_KEY_JWT = 'KUMANOMI_JWT_KEY_ENCRYPTION_UN_PEU_COMME_CE_QUON_A_FAIT_POUR_POSTGRES_UNE_SORTE_DE_CLEF_RANDOME_QUON_VA_STOCKER_EN_VARIABLE_DENV_CA_VA_ZINC_SINON'



export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const token = req.header('Authorization')?.split(' ')[1];
  //const token = req.headers.get('Authorization')?.split(' ')[1];

  if (!token) {
    return res.sendStatus(401);
  }

 

  jwt.verify(token, SECRET_KEY_JWT, (err, jwtPayload) => {
    if (err) {
      return res.sendStatus(403);
    }

    if (!jwtPayload) {
      return res.sendStatus(500)
    }

    console.log("from authenticateToken", jwtPayload)

    req.jwtPayload = jwtPayload;
    next();
  });
}
