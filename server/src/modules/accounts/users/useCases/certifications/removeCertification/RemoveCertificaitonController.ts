import { Request, Response } from "express";
import { RemoveCertificationUseCase } from "./RemoveCertificationUseCase";

class RemoveCertificationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: certification_id } = request.params;
    const removeCertificationUseCase = new RemoveCertificationUseCase();

    await removeCertificationUseCase.execute(certification_id);

    return response.status(200).send();
  }
}

export { RemoveCertificationController };