import { Application } from "express";
import homeRoutes from "./home.routes";
import sessionRoutes from "./session.routes";

export default class Routes {
  constructor(app: Application) {
    app.use("/api", homeRoutes);
    app.use("/sessions", sessionRoutes);
  }
}