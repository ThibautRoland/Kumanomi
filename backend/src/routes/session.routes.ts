import { Router } from "express";
import SessionsController from "../controllers/sessions.controller";
import TasksController from "../controllers/tasks.controller";
import { authenticateToken } from "../middleware/authenticateToken";

class SessionRoutes {
  router = Router();
  sessionsController = new SessionsController();
  tasksController = new TasksController();

  constructor() {
    this.intializeRoutes();
  }

  intializeRoutes() {
    // Create a new Tutorial
    this.router.post("/login", this.sessionsController.login);
   // this.router.post("/", this.controller.create);
    this.router.get('/tasks', authenticateToken, this.tasksController.tasks);
    // Retrieve all Tutorials
    //this.router.get("/", this.controller.findAll);

    // Retrieve a single Tutorial with id
    //this.router.get("/:id", this.controller.findOne);

    // Update a Tutorial with id
   // this.router.put("/:id", this.controller.update);

    // Delete a Tutorial with id
    //this.router.delete("/:id", this.controller.delete);
  }
}

export default new SessionRoutes().router;
