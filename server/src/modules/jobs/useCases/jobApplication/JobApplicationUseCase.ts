import { JobsOnUsers } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";

class JobApplicationUseCase {
  async execute(job_id: string, user_id: string): Promise<JobsOnUsers> {
    const jobsRepository = new JobsRepository();

    const job = await jobsRepository.findJobById(job_id);

    if (!job) {
      throw new Error("Could not find job!");
    }

    if (job.open === false) {
      throw new Error("Job is not open!");
    }

    const isApplied = await jobsRepository.checkApplication(job_id, user_id);

    if (isApplied) {
      throw new Error("You already applied for this job!");
    }

    const application = await jobsRepository.jobApplication(job_id, user_id);

    return application;
  }
}

export { JobApplicationUseCase };