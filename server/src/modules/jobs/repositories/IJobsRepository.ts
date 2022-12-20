import { Jobs, JobsOnUsers, Prisma } from "@prisma/client";
import { ICreateJobDTO } from "../dtos/ICreateJobDTO";
import { IFindJobsResponseDTO } from "../dtos/IFindJobsResponse";

interface IJobsRepository {
  create(company_id: string, data: ICreateJobDTO): Promise<Jobs>;
  findAllJobs(options: Prisma.JobsFindManyArgs): Promise<Jobs[]>;
  findJobsByCompany(company_id: string, cursor?: string): Promise<IFindJobsResponseDTO[]>;
  findJobById(job_id: string): Promise<Jobs | null>;
  changeOpen(job_id: string, isOpen: boolean): Promise<Jobs>;
  deleteJob(job_id: string): Promise<void>;
  jobApplication(job_id: string, user_id: string): Promise<JobsOnUsers>;
  findJobsByUser(user_id: string, cursor?: string): Promise<JobsOnUsers[]>;
  findJobCandidates(job_id: string): Promise<JobsOnUsers[]>;
  deleteApplication(application__id: string): Promise<void>;
  checkApplication(job_id: string, user_id: string): Promise<JobsOnUsers | null>;
}

export { IJobsRepository };