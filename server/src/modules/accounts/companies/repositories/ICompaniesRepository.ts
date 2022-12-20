import { Companies } from "@prisma/client";

interface ICompaniesRepository {
  create(data: ICreateCompanyDTO): Promise<Companies>;
  findByEmail(email: string): Promise<Companies | null>;
  findById(company_id: string): Promise<Companies | null>;
  update(data: IUpdateUserDTO, company_id: string): Promise<Companies>;
  uploadLogo(logo: string, company_id: string): Promise<void>;
}

export { ICompaniesRepository };