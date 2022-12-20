import { Router } from "express";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ChangeJobOpenController } from "../modules/jobs/useCases/changeJobOpen/ChangeJobOpenController";
import { CheckIsAppliedController } from "../modules/jobs/useCases/checkIsApplied/CheckIsAppliedController";
import { CreateJobController } from "../modules/jobs/useCases/createJob/CreateJobController";
import { DeleteJobController } from "../modules/jobs/useCases/deleteJob/DeleteJobController";
import { FindAllJobsController } from "../modules/jobs/useCases/findAllJobs/FindAllJobsController";
import { FindJobByIdController } from "../modules/jobs/useCases/findJobById/findJobByIdController";
import { FindJobsCandidatesController } from "../modules/jobs/useCases/findJobCandidates/FindJobsCandidatesController";
import { FindJobsByCompanyController } from "../modules/jobs/useCases/findJobsByCompany/FindJobsByCompanyController";
import { FindJobsByUserController } from "../modules/jobs/useCases/findJobsByUser/FindJobsByUserController";
import { JobApplicationController } from "../modules/jobs/useCases/jobApplication/JobApplicationController";
import { RemoveApplicationController } from "../modules/jobs/useCases/removeApplication/RemoveApplicationController";

const jobsRoutes = Router();

const createJobController = new CreateJobController();
const findAllJobsController = new FindAllJobsController();
const findJobByIdController = new FindJobByIdController();
const findJobsByCompanyController = new FindJobsByCompanyController();
const changeJobOpenController = new ChangeJobOpenController();
const deleteJobController = new DeleteJobController();
const jobApplicationController = new JobApplicationController();
const removeApplicationController = new RemoveApplicationController();
const checkIsAppliedController = new CheckIsAppliedController();
const findJobsByUserController = new FindJobsByUserController();
const findJobsCandidatesController = new FindJobsCandidatesController();

jobsRoutes.post("/", ensureAuthenticated, createJobController.handle);
jobsRoutes.get("/search/:cursor?", ensureAuthenticated, findAllJobsController.handle);
jobsRoutes.get("/company/:cursor?", ensureAuthenticated, findJobsByCompanyController.handle);
jobsRoutes.get("/candidates/:id", ensureAuthenticated, findJobsCandidatesController.handle);
jobsRoutes.get("/user/:cursor?", ensureAuthenticated, findJobsByUserController.handle);
jobsRoutes.get("/check/applied/:id", ensureAuthenticated, checkIsAppliedController.handle)
jobsRoutes.patch("/open/:id", ensureAuthenticated, changeJobOpenController.handle);
jobsRoutes.delete("/delete/:id", ensureAuthenticated, deleteJobController.handle);
jobsRoutes.post("/apply", ensureAuthenticated, jobApplicationController.handle);
jobsRoutes.delete("/application/delete/:id", ensureAuthenticated, removeApplicationController.handle);
jobsRoutes.get("/:id", ensureAuthenticated, findJobByIdController.handle);

export { jobsRoutes }