import { Jobs } from "@prisma/client";
import { JobsRepository } from "../../repositories/JobsRepository";
import { Prisma } from "@prisma/client";

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

class FindAllJobsUseCase {
  async execute(cursor?: string, query?: string, remote?: boolean, level?: string): Promise<Jobs[]> {
    const jobsRepository = new JobsRepository();

    const options: Prisma.JobsFindManyArgs = {
      select,
      take: 10,
      orderBy: {
        created_at: "asc"
      },
      where: {
        open: true,
      }
    };

    if (query) {
      options.where = {
        ...options.where,
        AND: {
          OR: [
            {
              title: {
                search: query.split(" ").join(" & "),
                mode: "insensitive"
              }
            },
            {
              technologies: {
                has: query,
              }
            },
            {
              location: {
                search: query.split(" ").join(" & "),
                mode: "insensitive"
              }
            },
            {
              description: {
                search: query.split(" ").join(" & "),
                mode: "insensitive"
              }
            },
          ],
        }
      }
    }

    if (cursor) {
      options.cursor = {
        id: cursor
      }
      options.skip = 1;
    }

    if (remote === true) {
      options.where = {
        ...options.where,
        home_office: true
      }
    }

    if (level) {
      options.where = {
        ...options.where,
        level
      }
    }

    const jobs = await jobsRepository.findAllJobs(options);

    return jobs;
  }
}

export { FindAllJobsUseCase };