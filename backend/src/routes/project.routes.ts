import { Router } from "express";
import ProjectsController from "../controllers/projects.controller";

class ProjectRoutes {
    router = Router();
    projectsController = new ProjectsController();
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
      this.router.get("/", this.projectsController.getAllProjects);
    }
  }
  
  export default new ProjectRoutes().router;