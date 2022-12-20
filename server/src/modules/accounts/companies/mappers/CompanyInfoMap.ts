import { Companies } from "@prisma/client";

class CompanyInfoMap {
  static toDTO({
    created_at,
    description,
    email,
    employees_num,
    linkedin,
    logo,
    name,
    web_site,
  }: Companies): ICompanyResponseDTO {
    const company = {
      email,
      description,
      employees_num,
      linkedin,
      logo,
      name,
      web_site,
      created_at,
    };

    return company;
  }
}

export { CompanyInfoMap };