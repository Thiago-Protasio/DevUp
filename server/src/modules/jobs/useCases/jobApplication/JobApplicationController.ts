import { Request, Response } from "express";
import { JobApplicationUseCase } from "./JobApplicationUseCase";

class JobApplicationController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const { job_id } = request.body;

    const jobApplicationUseCase = new JobApplicationUseCase();

    const application = await jobApplicationUseCase.execute(job_id, user_id);

    return response.status(200).json(application);
  }
}

export { JobApplicationController }