import { resolve } from "path";
import fs from "fs";
import upload from "../../../../../config/upload";
import { CompaniesRepository } from "../../repositories/CompaniesRepository";

class UploadLogoUseCase {
  async execute(logo: string, company_id: string): Promise<string> {
    const companiesRepository = new CompaniesRepository();
    const company = await companiesRepository.findById(company_id);

    if (!company) {
      throw new Error("Company not found!");
    }

    if (company.logo) {
      const filename = resolve(`${upload.uploadsFolder}/logos`, company.logo);

      try {
        await fs.promises.stat(filename);
      } catch (error) {
        throw new Error(`${error}`);
      }
      await fs.promises.unlink(filename);
    }

    await fs.promises.rename(
      resolve(upload.uploadsFolder, logo),
      resolve(`${upload.uploadsFolder}/logos`, logo)
    );

    await companiesRepository.uploadLogo(logo, company_id);

    return logo;
  }
}

export { UploadLogoUseCase };