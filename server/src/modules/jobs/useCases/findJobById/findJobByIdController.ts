import { Request, Response } from "express";
import { FindJobByIdUseCase } from "./findJobByIdUseCase";

class FindJobByIdController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: job_id } = request.params;
    const findJobByIdUseCase = new FindJobByIdUseCase();

    const job = await findJobByIdUseCase.execute(job_id);

    return response.status(200).json(job);
  }
}

export { FindJobByIdController };