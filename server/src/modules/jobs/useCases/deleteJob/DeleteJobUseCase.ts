import { JobsRepository } from "../../repositories/JobsRepository";

class DeleteJobUseCase {
  async execute(job_id: string, company_id: string): Promise<void> {
    const jobsRepository = new JobsRepository();

    const job = await jobsRepository.findJobById(job_id);

    if (!job) {
      throw new Error("Could not find job!");
    }

    if (job.company_id !== company_id) {
      throw new Error("Company id is not valid!");
    }

    await jobsRepository.deleteJob(job_id);

    return;
  }
}

export { DeleteJobUseCase };