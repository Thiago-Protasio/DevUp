import { Companies } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { IUpdateCompanyDTO } from "../dtos/IUpdateCompanyDTO";
import { ICompaniesRepository } from "./ICompaniesRepository";

class CompaniesRepository implements ICompaniesRepository {
  async create({ email, password, name, description }: ICreateCompanyDTO): Promise<Companies> {
    const company = await prisma.companies.create({
      data: {
        email,
        password,
        name,
        description
      }
    });

    return company;
  };

  async findByEmail(email: string): Promise<Companies | null> {
    const company = await prisma.companies.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive"
        }
      }
    });

    return company;
  }

  async findById(company_id: string): Promise<Companies | null> {
    const company = await prisma.companies.findFirst({
      where: {
        id: {
          equals: company_id
        }
      }
    });

    return company;
  }

  async update(data: IUpdateCompanyDTO, company_id: string): Promise<Companies> {
    const company = await prisma.companies.update({
      where: {
        id: company_id
      },
      data: {
        name: data.name,
        description: data.description,
        linkedin: data.linkedin,
        employees_num: data.employees_num,
        web_site: data.web_site,
      }
    });

    return company;
  }

  async uploadLogo(logo: string, company_id: string): Promise<void> {
    await prisma.companies.update({
      where: {
        id: company_id
      },
      data: {
        logo: logo,
      }
    });
  }

}

export { CompaniesRepository };