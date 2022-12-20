import { JobsOnUsers } from "@prisma/client";

interface IFindJobsResponseDTO {
  id: string;
  company_id: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  location: string | null;
  home_office: boolean;
  open: boolean;
  created_at: Date;
  companies: {
    name: string;
  } | null;
  candidates: JobsOnUsers[];
}

export { IFindJobsResponseDTO }