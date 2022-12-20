import { Request, Response } from "express";
import { RemoveEducationUseCase } from "./RemoveEducationUseCase";

class RemoveEducationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const { id: education_id } = request.params;

    const removeEducationUseCase = new RemoveEducationUseCase();

    await removeEducationUseCase.execute(education_id, user_id);

    return response.status(200).send();
  }
}

export { RemoveEducationController };