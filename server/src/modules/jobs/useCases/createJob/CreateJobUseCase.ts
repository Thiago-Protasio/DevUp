import { Jobs } from "@prisma/client";
import { ICreateJobDTO } from "../../dtos/ICreateJobDTO";
import { JobsRepository } from "../../repositories/JobsRepository";

class CreateJobUseCase {
  async execute(company_id: string, data: ICreateJobDTO): Promise<void> {
    const jobsRepository = new JobsRepository();

    const job = jobsRepository.create(company_id, data);

    if (!job) {
      throw new Error("Could not create a new job");
    }

    return;
  }
}

export { CreateJobUseCase };