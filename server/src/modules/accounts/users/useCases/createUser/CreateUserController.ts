import { Request, Response } from "express";
import { CreateUserUseCase } from "./CreateUserUseCase";

class CreateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { email, password, name, birthday, password_confirm } = request.body;
    const createUserUseCase = new CreateUserUseCase();

    const token = await createUserUseCase.execute({
      email,
      password,
      password_confirm,
      name,
      birthday,
    });

    return response.status(201).json(token);
  }
}

export { CreateUserController };