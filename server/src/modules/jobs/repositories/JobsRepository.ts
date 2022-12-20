import { Jobs, JobsOnUsers, Prisma } from "@prisma/client";
import { prisma } from "../../../database/prismaClient";
import { ICreateJobDTO } from "../dtos/ICreateJobDTO";
import { IFindJobByIdResponse } from "../dtos/IFindJobByIdResponse";
import { IFindJobsResponseDTO } from "../dtos/IFindJobsResponse";
import { IJobsRepository } from "./IJobsRepository";

class JobsRepository implements IJobsRepository {
  async create(company_id: string, { description, home_office, level, technologies, title, location }: ICreateJobDTO): Promise<Jobs> {
    const job = await prisma.jobs.create({
      data: {
        company_id,
        description,
        home_office,
        level,
        title,
        technologies,
        location,
      }
    });
    return job;
  }

  async deleteJob(job_id: string): Promise<void> {
    await prisma.jobs.delete({
      where: {
        id: job_id
      },
    })

    return;
  }

  async changeOpen(job_id: string, isOpen: boolean): Promise<Jobs> {
    const job = await prisma.jobs.update({
      data: {
        open: !isOpen
      },
      where: {
        id: job_id
      },
    })

    return job;
  }

  async jobApplication(job_id: string, user_id: string): Promise<JobsOnUsers> {
    const application = await prisma.jobsOnUsers.create({
      data: {
        jobs_id: job_id,
        user_id,
      }
    });

    return application;
  }

  async deleteApplication(application_id: string): Promise<void> {
    await prisma.jobsOnUsers.delete({
      where: {
        id: application_id
      },
    });

    return;
  }

  async checkApplication(job_id: string, user_id: string): Promise<JobsOnUsers | null> {
    const application = prisma.jobsOnUsers.findFirst({
      where: {
        jobs_id: job_id,
        user_id: user_id,
      },
    });

    return application;
  }

  async findJobCandidates(job_id: string): Promise<JobsOnUsers[]> {
    const select = {
      id: true,
      name: true,
      email: true,
      birthday: true,
      pic: true,
      about: true,
      salary_pretension: true,
      github: true,
      linkedin: true,
      phone: true,
      headline: true,
      country: true,
      city: true,
      languages: true,
      level: true,
      skills: true,
      resume: true,
      certifications: true,
      education: true,
      experiences: true,
    }
    const candidates = await prisma.jobsOnUsers.findMany({
      take: 10,
      where: {
        jobs_id: job_id
      },
      include: {
        users: {
          select,
        }
      },
      orderBy: {
        created_at: "desc"
      }
    });

    return candidates
  }

  async findJobsByUser(user_id: string, cursor?: string): Promise<JobsOnUsers[]> {
    if (cursor) {
      const jobs = await prisma.jobsOnUsers.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: cursor
        },
        where: {
          user_id
        },
        include: {
          jobs: {
            include: {
              companies: {
                select: {
                  name: true
                }
              }
            }
          }
        },
        orderBy: {
          created_at: "desc"
        }
      });

      return jobs;
    } else {
      const jobs = await prisma.jobsOnUsers.findMany({
        take: 10,
        where: {
          user_id
        },
        include: {
          jobs: {
            include: {
              companies: {
                select: {
                  name: true
                }
              }
            }
          },
        },
        orderBy: {
          created_at: "desc"
        }
      });

      return jobs;
    }
  }

  async findJobsByCompany(company_id: string, cursor?: string): Promise<IFindJobsResponseDTO[]> {
    const select = {
      id: true,
      company_id: true,
      title: true,
      description: true,
      technologies: true,
      level: true,
      location: true,
      home_office: true,
      open: true,
      created_at: true,
      candidates: true,
      companies: {
        select: {
          name: true,
        }
      }
    }

    if (cursor) {
      const jobs = await prisma.jobs.findMany({
        take: 10,
        skip: 1,
        cursor: {
          id: cursor,
        },
        where: {
          company_id,
        },
        select,
        orderBy: {
          created_at: "asc"
        }
      });

      return jobs;
    } else {
      const jobs = await prisma.jobs.findMany({
        take: 10,
        where: {
          company_id,
        },
        select,
        orderBy: {
          created_at: "asc"
        }
      });
      return jobs;
    }
  }

  async findJobById(job_id: string): Promise<IFindJobByIdResponse | null> {
    const job = await prisma.jobs.findFirst({
      where: {
        id: job_id
      },
      include: {
        companies: {
          select: {
            name: true,
            description: true,
            logo: true,
          }
        },
        candidates: true,
      }
    });

    return job;
  }

  async findAllJobs(options: Prisma.JobsFindManyArgs): Promise<Jobs[]> {
    const jobs = await prisma.jobs.findMany(options);

    return jobs;
  }
}

export { JobsRepository };