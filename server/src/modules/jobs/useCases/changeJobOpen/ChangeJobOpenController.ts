import { Request, Response } from "express";
import { ChangeJobOpenUseCase } from "./ChangeJobOpenUseCase";

class ChangeJobOpenController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: job_id } = request.params;
    const { id: company_id } = request;

    const changeJobOpenUseCase = new ChangeJobOpenUseCase();

    const job = await changeJobOpenUseCase.execute(job_id, company_id);

    return response.status(200).json(job);
  }
}

export { ChangeJobOpenController };