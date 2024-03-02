import { Router } from "express";
import { welcome } from "../controllers/home.controller";
import { authenticateToken } from "../middleware/authenticateToken";

class HomeRoutes {
  router = Router();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    this.router.get("/",authenticateToken, welcome);
  }
}

export default new HomeRoutes().router;
