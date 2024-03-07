import { Router } from "express";
import ProjectsController from "../controllers/projects.controller";
import { authenticateToken } from "../middleware/authenticateToken";

class ProjectRoutes {
    router = Router();
    projectsController = new ProjectsController();
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
      this.router.get("/", this.projectsController.getAllProjects);
      this.router.get("/:projectId", authenticateToken, this.projectsController.getProjectById);      
    }
  }
  
  export default new ProjectRoutes().router;