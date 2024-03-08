import { Request, Response } from "express";
import { RequestLogin } from "../interfaces/RequestLogin";
const sessionsLogic = require('../logic/sessions.logic');

export default class SessionsController {

  async login(req: Request, res: Response) {

    //TODO maybe use lodash instead ?
    if (Object.keys(req.body).length === 0) {
      return res.status(422).json("body is empty")
    }

    const body = req.body as RequestLogin;

    if (body.email === null || body.password === null) {
      return res.status(422).json("body is null")
    }

    try {
      const userAuth = await sessionsLogic.isExist(body);

      // is empty
      if (userAuth.token.length === 0) {
        return res.status(404).json("user not found")  
      }
      return res.status(200).json(userAuth)

    } catch (error) {
        return res.status(522).json("big error "+error)
    }
  }
}
