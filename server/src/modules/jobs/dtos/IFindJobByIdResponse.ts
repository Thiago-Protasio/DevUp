import { JobsOnUsers } from "@prisma/client";

interface IFindJobByIdResponse {
  id: string;
  company_id: string;
  title: string;
  description: string;
  technologies: string[];
  level: string;
  location: string | null;
  home_office: boolean;
  open: boolean;
  candidates: JobsOnUsers[];
  companies: {
    description: string;
    name: string;
    logo: string | null;
  } | null;
  created_at: Date;
}

export { IFindJobByIdResponse }