import { Router } from "express";
import { authenticationRoutes } from "./authentication.routes";
import { companiesRoutes } from "./companies.routes";
import { jobsRoutes } from "./jobs.routes";
import { usersRoutes } from "./users.routes";

const routes = Router();

routes.use("/companies", companiesRoutes);
routes.use("/users", usersRoutes);
routes.use("/authenticate", authenticationRoutes);
routes.use("/jobs", jobsRoutes);

export { routes };