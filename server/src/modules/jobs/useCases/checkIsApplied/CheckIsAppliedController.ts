import { Request, Response } from "express";
import { CheckIsAppliedUseCase } from "./CheckIsAppliedUseCase";

class CheckIsAppliedController {
  async handle(request: Request, response: Response) {
    const { id: job_id } = request.params;
    const { id: user_id } = request;

    const checkIsAppliedUseCase = new CheckIsAppliedUseCase();

    const isApplied = await checkIsAppliedUseCase.execute(job_id, user_id);

    return response.status(200).json(isApplied);
  }
}

export { CheckIsAppliedController };