import { JobsOnUsers } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";

class FindJobsByUserUseCase {
  async execute(user_id: string, cursor?: string): Promise<JobsOnUsers[]> {
    const jobsRepository = new JobsRepository();

    if (cursor) {
      const jobs = await jobsRepository.findJobsByUser(user_id, cursor);
      return jobs;
    } else {
      const jobs = await jobsRepository.findJobsByUser(user_id);
      return jobs;
    }

  }
}

export { FindJobsByUserUseCase };