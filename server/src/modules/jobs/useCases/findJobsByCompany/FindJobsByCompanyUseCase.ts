import { Jobs } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";

class FindJobsByCompanyUseCase {
  async execute(company_id: string, cursor?: string): Promise<Jobs[]> {
    const jobsRepository = new JobsRepository();

    if (cursor) {
      const jobs = await jobsRepository.findJobsByCompany(company_id, cursor);
      return jobs;
    } else {
      const jobs = await jobsRepository.findJobsByCompany(company_id);
      return jobs;
    }
  }
}

export { FindJobsByCompanyUseCase };