import { JobsRepository } from "../../repositories/JobsRepository";

class CheckIsAppliedUseCase {
  async execute(job_id: string, user_id: string): Promise<boolean> {
    const jobsRepository = new JobsRepository();

    const application = await jobsRepository.checkApplication(job_id, user_id);

    if (application) {
      return true;
    } else {
      return false;
    }
  }
}

export { CheckIsAppliedUseCase };