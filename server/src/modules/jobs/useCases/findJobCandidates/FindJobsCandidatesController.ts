import { Request, Response } from "express";
import { FindJobsCandidatesUseCase } from "./FindJobsCandidatesUseCase";

class FindJobsCandidatesController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: job_id } = request.params;

    const findJobCandidatesUseCase = new FindJobsCandidatesUseCase();

    const candidates = await findJobCandidatesUseCase.execute(job_id);

    return response.status(200).json(candidates);
  }
}

export { FindJobsCandidatesController };