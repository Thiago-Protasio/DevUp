import { Request, Response } from "express";
import { FindJobsByUserUseCase } from "./FindJobsByUserUseCase";

class FindJobsByUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const { cursor } = request.params;

    const findJobsByUserUseCase = new FindJobsByUserUseCase();

    const jobs = await findJobsByUserUseCase.execute(user_id, cursor);

    return response.status(200).json(jobs);
  }
}

export { FindJobsByUserController };