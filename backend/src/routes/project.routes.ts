import { Router } from "express";
import ProjectsController from "../controllers/projects.controller";
import { authenticateToken } from "../middleware/authenticateToken";
import TasksController from "../controllers/tasks.controller";

class ProjectRoutes {
    router = Router();
    projectsController = new ProjectsController();
    tasksController = new TasksController
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
      this.router.get("/", this.projectsController.getAllProjects);
      this.router.get("/:projectId", authenticateToken, this.projectsController.getProjectById); 
      this.router.get("/:projectId/tasks", authenticateToken, this.tasksController.getProjectTasks);
    }
  }
  
  export default new ProjectRoutes().router;