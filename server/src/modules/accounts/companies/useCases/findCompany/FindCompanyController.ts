import { Request, Response } from "express";
import { CompanyInfoMap } from "../../mappers/CompanyInfoMap";
import { FindCompanyUseCase } from "./FindCompanyUseCase";

class FindCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: company_id } = request;
    const findCompanyUseCase = new FindCompanyUseCase();

    const company = await findCompanyUseCase.execute(company_id);

    return response.status(200).json(CompanyInfoMap.toDTO(company!));
  }
}

export { FindCompanyController };