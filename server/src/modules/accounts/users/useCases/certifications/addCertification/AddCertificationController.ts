import { Request, Response } from "express";
import { AddCertificationUseCase } from "./AddCertificationUseCase";

class AddCertificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const data: IAddCertificationDTO = request.body;

    const addCertificationUseCase = new AddCertificationUseCase();

    await addCertificationUseCase.execute(data, user_id);

    return response.status(201).send();
  }
}

export { AddCertificationController };