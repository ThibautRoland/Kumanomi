import { Router } from "express";
import { authenticateToken } from "../middleware/authenticateToken";
import { isProjectManager } from "../middleware/isProjectManager";
import ProjectMembersController from "../controllers/projectMembers.controller";

class ProjectMemberRoutes {
    router = Router();
    projectMembersController = new ProjectMembersController();
  
    constructor() {
      this.intializeRoutes();
    }
  
    intializeRoutes() {
      this.router.get("/:userId/:projectId", authenticateToken, this.projectMembersController.getProjectMember)
    }
  }
  
  export default new ProjectMemberRoutes().router;