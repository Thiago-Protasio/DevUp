import { JobsRepository } from "../../repositories/JobsRepository";

class RemoveApplicationUseCase {
  async execute(job_id: string, user_id: string) {
    const jobsRepository = new JobsRepository();

    const application = await jobsRepository.checkApplication(job_id, user_id);

    if (!application) {
      throw new Error("Application does not exists!");
    }

    await jobsRepository.deleteApplication(application.id);

    return;
  }
}

export { RemoveApplicationUseCase };