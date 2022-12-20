import { JobsRepository } from "../../repositories/JobsRepository";

class FindJobsCandidatesUseCase {
  async execute(job_id: string) {
    const jobsRepository = new JobsRepository();

    const candidates = await jobsRepository.findJobCandidates(job_id);

    return candidates;
  }
}

export { FindJobsCandidatesUseCase };