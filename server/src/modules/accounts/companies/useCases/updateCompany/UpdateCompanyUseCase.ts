import { Companies } from "@prisma/client";
import { IUpdateCompanyDTO } from "../../dtos/IUpdateCompanyDTO";
import { CompaniesRepository } from "../../repositories/CompaniesRepository";

class UpdateCompanyUseCase {
  async execute(data: IUpdateCompanyDTO, company_id: string): Promise<Companies> {
    const companiesRepository = new CompaniesRepository();
    const company = await companiesRepository.findById(company_id)

    if (!company) {
      throw new Error("Company not found!");
    }

    const newCompany = await companiesRepository.update(data, company_id);

    return newCompany;
  }
}

export { UpdateCompanyUseCase };
