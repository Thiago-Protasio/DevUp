import { Request, Response } from "express";
import { AddEducationUseCase } from "./AddEducationUseCase";

class AddEducationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const data: IAddEducationDTO = request.body;

    const addEducationUseCase = new AddEducationUseCase();

    await addEducationUseCase.execute(data, user_id);

    return response.status(201).send();
  }
}

export { AddEducationController };