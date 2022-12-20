import { Router } from "express";
import { CreateCompanyController } from "../modules/accounts/companies/useCases/createCompany/CreateCompanyController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { UpdateCompanyController } from "../modules/accounts/companies/useCases/updateCompany/UpdateCompanyController";
import uploadConfig from "../config/upload";
import multer from "multer";
import { UploadLogoController } from "../modules/accounts/companies/useCases/uploadLogo/UploadLogoController";
import { FindCompanyController } from "../modules/accounts/companies/useCases/findCompany/FindCompanyController";

const companiesRoutes = Router();

const uploadLogo = multer(uploadConfig);

const createCompanyController = new CreateCompanyController();
const updateCompanyController = new UpdateCompanyController();
const uploadLogoController = new UploadLogoController();
const findCompanyController = new FindCompanyController();

companiesRoutes.post("/", createCompanyController.handle);
companiesRoutes.put("/update", ensureAuthenticated, updateCompanyController.handle);
companiesRoutes.patch("/logo", ensureAuthenticated, uploadLogo.single("logo"), uploadLogoController.handle);
companiesRoutes.get("/information", ensureAuthenticated, findCompanyController.handle);

export { companiesRoutes };