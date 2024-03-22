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
      this.router.delete("/:taskId", authenticateToken, this.tasksController.deleteTask)
      this.router.patch("/:taskId", authenticateToken, this.tasksController.patchTaskStatus)   
    }
  }
  
  export default new TaskRoutes().router;