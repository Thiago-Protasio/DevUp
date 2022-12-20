import { Request, Response } from "express";
import { RemoveExperienceUseCase } from "./RemoveExperienceUseCase";

class RemoveExperienceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: experience_id } = request.params;
    const { id: user_id } = request;
    const removeExperienceUseCase = new RemoveExperienceUseCase();

    await removeExperienceUseCase.execute(experience_id, user_id);

    return response.status(200).send();
  }
}

export { RemoveExperienceController };