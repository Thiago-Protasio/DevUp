import { Request, Response } from "express";
import { FindAllExperiencesUseCase } from "./FindAllExperiencesUseCase";

class FindAllExperiencesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;

    const findAllExperiencesUseCase = new FindAllExperiencesUseCase();

    const experiences = await findAllExperiencesUseCase.execute(user_id);

    return response.status(200).json(experiences);
  }
}

export { FindAllExperiencesController };