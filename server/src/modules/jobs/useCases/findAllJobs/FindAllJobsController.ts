import { Request, Response } from "express";
import { FindAllJobsUseCase } from "./FindAllJobsUseCase";

class FindAllJobsController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { cursor } = request.params;
    const { q: query } = request.query;
    const { remote: remoteQuery } = request.query;
    const { level } = request.query;

    let remote = false;

    if (remoteQuery === "true") {
      remote = true;
    }

    const findAllJobsUseCase = new FindAllJobsUseCase();

    const jobs = await findAllJobsUseCase.execute(cursor, query?.toString().split("+").join(" "), remote, level?.toString());

    return response.status(200).json(jobs);
  }
}

export { FindAllJobsController };