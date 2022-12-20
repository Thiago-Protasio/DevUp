import { Router } from "express";
import { CreateUserController } from "../modules/accounts/users/useCases/createUser/CreateUserController";
import { UpdateUserController } from "../modules/accounts/users/useCases/updateUser/UpdateUserController";
import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import multer from "multer";
import uploadConfig from "../config/upload";
import { UploadAvatarController } from "../modules/accounts/users/useCases/uploadAvatar/UploadAvatarController";
import { UploadResumeController } from "../modules/accounts/users/useCases/uploadResume/UploadResumeController";
import { AddExperienceController } from "../modules/accounts/users/useCases/experience/addExperience/AddExperienceController";
import { AddCertificationController } from "../modules/accounts/users/useCases/certifications/addCertification/AddCertificationController";
import { AddEducationController } from "../modules/accounts/users/useCases/education/addEducation/AddEducationController";
import { RemoveCertificationController } from "../modules/accounts/users/useCases/certifications/removeCertification/RemoveCertificaitonController";
import { RemoveExperienceController } from "../modules/accounts/users/useCases/experience/removeExperience/RemoveExperienceController";
import { RemoveEducationController } from "../modules/accounts/users/useCases/education/removeEducation/RemoveEducationController";
import { FindUserController } from "../modules/accounts/users/useCases/findUser/FindUserController";
import { FindEducationController } from "../modules/accounts/users/useCases/education/findEducation/FindEducationController";
import { FindAllCertificationsController } from "../modules/accounts/users/useCases/certifications/findAllCertifications/FindAllCertificationsController";
import { FindAllExperiencesController } from "../modules/accounts/users/useCases/experience/findAllExperiences/FindAllExperiencesController";

const usersRoutes = Router();

const uploadAvatar = multer(uploadConfig);

const createUserController = new CreateUserController();
const updateUserController = new UpdateUserController();
const findUserController = new FindUserController();

const uploadAvatarController = new UploadAvatarController();
const uploadResumeController = new UploadResumeController();

const addExperienceController = new AddExperienceController();
const removeExperienceController = new RemoveExperienceController();
const findAllExperiencesController = new FindAllExperiencesController();

const addCertificationController = new AddCertificationController();
const removeCertificationController = new RemoveCertificationController();
const findAllCertificationsController = new FindAllCertificationsController();

const addEducationController = new AddEducationController();
const removeEducationController = new RemoveEducationController();
const findEducationController = new FindEducationController();

usersRoutes.post("/", createUserController.handle);
usersRoutes.put("/update", ensureAuthenticated, updateUserController.handle);
usersRoutes.get("/information", ensureAuthenticated, findUserController.handle);

usersRoutes.patch("/avatar", ensureAuthenticated, uploadAvatar.single("avatar"), uploadAvatarController.handle);
usersRoutes.patch("/resume", ensureAuthenticated, uploadAvatar.single("resume"), uploadResumeController.handle);

usersRoutes.post("/add/experience", ensureAuthenticated, addExperienceController.handle);
usersRoutes.get("/experience", ensureAuthenticated, findAllExperiencesController.handle);

usersRoutes.post("/add/certification", ensureAuthenticated, addCertificationController.handle);
usersRoutes.get("/certification", ensureAuthenticated, findAllCertificationsController.handle);

usersRoutes.post("/add/education", ensureAuthenticated, addEducationController.handle);
usersRoutes.get("/education", ensureAuthenticated, findEducationController.handle);

usersRoutes.delete("/remove/certification/:id", ensureAuthenticated, removeCertificationController.handle);
usersRoutes.delete("/remove/experience/:id", ensureAuthenticated, removeExperienceController.handle);
usersRoutes.delete("/remove/education/:id", ensureAuthenticated, removeEducationController.handle);

export { usersRoutes };