import { Request, Response } from "express";
import { AuthenticateCompanyUseCase } from "./AuthenticateCompanyUseCase";

class AuthenticateCompanyController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateCompanyUseCase = new AuthenticateCompanyUseCase();
    const token = await authenticateCompanyUseCase.execute({
      email,
      password,
    });

    return response.status(200).json(token);
  }
}

export { AuthenticateCompanyController };