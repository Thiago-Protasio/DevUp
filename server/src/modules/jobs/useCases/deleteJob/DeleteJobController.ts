import { Request, Response } from "express";
import { DeleteJobUseCase } from "./DeleteJobUseCase";

class DeleteJobController {
  async handle(request: Request, response: Response) {
    const { id: job_id } = request.params;
    const { id: company_id } = request;

    const deleteJobUseCase = new DeleteJobUseCase();

    await deleteJobUseCase.execute(job_id, company_id);

    return response.status(200).send();
  }
}

export { DeleteJobController };