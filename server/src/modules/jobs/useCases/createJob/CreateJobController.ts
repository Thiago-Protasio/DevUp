import { Request, Response } from "express";
import { CreateJobUseCase } from "./CreateJobUseCase";

class CreateJobController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: company_id } = request;
    const data = request.body;

    const createJobUseCase = new CreateJobUseCase();

    await createJobUseCase.execute(company_id, data);

    return response.status(200).send();
  }
}

export { CreateJobController };