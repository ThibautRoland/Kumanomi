import { Router } from "express";
import SessionsController from "../controllers/sessions.controller";
import { authenticateToken } from "../middleware/authenticateToken";

class SessionRoutes {
  router = Router();
  sessionsController = new SessionsController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.post("/login", this.sessionsController.login);
  }
}

export default new SessionRoutes().router;
