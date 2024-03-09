import { Application } from "express";
import homeRoutes from "./home.routes";
import sessionRoutes from "./session.routes";
import projectRoutes from "./project.routes";
import taskRoutes from "./task.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/sessions", sessionRoutes);
    app.use("/projects", projectRoutes);
    app.use("/tasks", taskRoutes);
  }
}
