import { Router } from "express";
import { AuthenticateCompanyController } from "../modules/accounts/companies/useCases/authenticateCompany/AuthenticateCompanyController";
import { AuthenticateUserController } from "../modules/accounts/users/useCases/authenticateUser/AuthenticateUserController";

const authenticationRoutes = Router();

const authenticateCompanyController = new AuthenticateCompanyController();
const authenticateUserController = new AuthenticateUserController();

authenticationRoutes.post("/company", authenticateCompanyController.handle);
authenticationRoutes.post("/user", authenticateUserController.handle);

export { authenticationRoutes };