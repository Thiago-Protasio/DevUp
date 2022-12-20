import { Request, Response } from "express";
import { FindJobsByCompanyUseCase } from "./FindJobsByCompanyUseCase";

class FindJobsByCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cursor } = request.params;
    const { id: company_id } = request;

    const findJobsByCompanyUseCase = new FindJobsByCompanyUseCase();

    const jobs = await findJobsByCompanyUseCase.execute(company_id, cursor);

    return response.status(200).json(jobs);
  }
}

export { FindJobsByCompanyController };