import { CompaniesRepository } from "../../repositories/CompaniesRepository";

class FindCompanyUseCase {
  async execute(company_id: string) {
    const companiesRepository = new CompaniesRepository();

    const company = companiesRepository.findById(company_id);

    if (!company) {
      throw new Error("Company not found!");
    }

    return company;
  }
}

export { FindCompanyUseCase };