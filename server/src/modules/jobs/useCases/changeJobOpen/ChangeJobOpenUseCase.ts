import { Jobs } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";

class ChangeJobOpenUseCase {
  async execute(job_id: string, company_id: string): Promise<Jobs> {
    const jobsRepository = new JobsRepository();

    const findJob = await jobsRepository.findJobById(job_id);

    if (!findJob) {
      throw new Error("Job not found!");
    }

    if (findJob.company_id !== company_id) {
      throw new Error("Could not update job")
    }

    const isOpen = findJob.open;

    const job = await jobsRepository.changeOpen(job_id, isOpen);

    return job;
  }
}

export { ChangeJobOpenUseCase };