import { Request, Response } from "express";
import { IUpdateCompanyDTO } from "../../dtos/IUpdateCompanyDTO";
import { UpdateCompanyUseCase } from "./UpdateCompanyUseCase";

class UpdateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IUpdateCompanyDTO = request.body;
    const { id: company_id } = request;

    const updateCompanyUseCase = new UpdateCompanyUseCase();

    const company = await updateCompanyUseCase.execute(data, company_id);

    return response.status(200).json(company);
  }
}

export { UpdateCompanyController };