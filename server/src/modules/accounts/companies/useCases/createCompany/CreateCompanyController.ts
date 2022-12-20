import { Request, Response } from "express";
import { CreateCompanyUseCase } from "./CreateCompanyUseCase";

class CreateCompanyController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, password_confirm, name, description } = request.body;
    const createCompanyUseCase = new CreateCompanyUseCase();

    const token = await createCompanyUseCase.execute({
      email,
      password,
      password_confirm,
      name,
      description
    });

    return response.status(201).json(token);
  }
}

export { CreateCompanyController };