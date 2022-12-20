import { Request, Response } from "express";
import { FindEducationUseCase } from "./FindEducationUseCase";

class FindEducationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;

    const findEducationUseCase = new FindEducationUseCase();

    const education = await findEducationUseCase.execute(user_id);

    return response.status(200).json(education);
  }
}

export { FindEducationController };