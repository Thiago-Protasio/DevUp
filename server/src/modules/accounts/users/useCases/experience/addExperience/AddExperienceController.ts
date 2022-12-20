import { Request, Response } from "express";
import { IAddExperienceDTO } from "../../../dtos/IAddExperienceDTO";
import { AddExperienceUseCase } from "./AddExperienceUseCase";

class AddExperienceController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const data: IAddExperienceDTO = request.body;

    const addExperienceUseCase = new AddExperienceUseCase();

    await addExperienceUseCase.execute(data, user_id);

    return response.status(200).send();
  }
}

export { AddExperienceController };