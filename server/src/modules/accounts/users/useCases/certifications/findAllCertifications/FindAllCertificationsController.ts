import { Request, Response } from "express";
import { FindAllCertificationsUseCase } from "./FindAllCertificationsUseCase";

class FindAllCertificationsController {
  async handle(request: Request, response: Response) {
    const { id: user_id } = request;

    const findAllCertificationsUseCase = new FindAllCertificationsUseCase();

    const certifications = await findAllCertificationsUseCase.execute(user_id);

    return response.status(200).json(certifications);
  }
}

export { FindAllCertificationsController };