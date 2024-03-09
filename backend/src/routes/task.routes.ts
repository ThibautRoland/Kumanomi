import { Router } from "express";
import TasksController from "../controllers/tasks.controller";
import { authenticateToken } from "../middleware/authenticateToken";

class TaskRoutes {
    router = Router();
    tasksController = new TasksController();
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
      this.router.get("/:projectId", authenticateToken, this.tasksController.getProjectTasks);   
    }
  }
  
  export default new TaskRoutes().router;