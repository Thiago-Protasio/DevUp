import { Jobs } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";

class FindJobByIdUseCase {
  async execute(job_id: string): Promise<Jobs | null> {
    const jobsRepository = new JobsRepository();

    const job = await jobsRepository.findJobById(job_id);

    if (!job) {
      throw new Error("Job not found!");
    }

    return job;
  }
}

export { FindJobByIdUseCase };