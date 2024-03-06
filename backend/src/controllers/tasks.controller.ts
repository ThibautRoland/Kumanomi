import { Request, Response } from "express";
import { RequestLogin } from "../interfaces/RequestLogin";
const sessionsLogic = require('../logic/sessions.logic');

export default class TasksController {

  async tasks(req: Request, res: Response) {

    
   
      return res.status(200).json( [
        {
          id : 1,
          name : "task 1"
        },
        {
          id : 2,
          name : "task 2"
        },
        {
          id : 3,
          name : "task 3"
        }
      ]
        
        
      )
    
  }
}
