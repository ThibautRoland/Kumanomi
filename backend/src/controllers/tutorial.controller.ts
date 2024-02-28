import { Request, Response } from "express";
const sessionsLogic = require('../logic/logic');

type RequestLogin = {
  email: string,
  password: string
}


export default class TutorialController {

  async login(req: Request, res: Response) {


    if (req.body === null ) {
      return res.status(422).json("body is null")
  }

  const body = req.body as RequestLogin;

  if (body.email === null || body.password === null) {
      return res.status(422).json("body is null")
  }

  try {
      const result = await sessionsLogic.isExist();
      return res.status(200).json("result")

  } catch (error) {
      return res.status(522).json("big error "+error)
  }

  }

  /*async create(req: Request, res: Response) {
    try {
      res.status(201).json({
        message: "create OK",
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findAll OK"
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "findOne OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async update(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "update OK",
        reqParamId: req.params.id,
        reqBody: req.body
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      res.status(200).json({
        message: "delete OK",
        reqParamId: req.params.id
      });
    } catch (err) {
      res.status(500).json({
        message: "Internal Server Error!"
      });
    }
  }*/
}
