import { Request, Response } from "express";
import { RemoveApplicationUseCase } from "./RemoveApplicationUseCase";

class RemoveApplicationController {
  async handle(request: Request, response: Response) {
    const { id: job_id } = request.params;
    const { id: user_id } = request;

    const removeApplicationUseCase = new RemoveApplicationUseCase();

    await removeApplicationUseCase.execute(job_id, user_id);

    return response.status(200).send();
  }
}

export { RemoveApplicationController };