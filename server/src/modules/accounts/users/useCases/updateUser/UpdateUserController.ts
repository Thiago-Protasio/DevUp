import { Request, Response } from "express";
import { UserInfoMap } from "../../mappers/UserInfoMap";
import { UpdateUserUseCase } from "./UpdateUserUseCase";

class UpdateUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const data: IUpdateUserDTO = request.body;
    const { id: user_id } = request;

    const updateUserUseCase = new UpdateUserUseCase();

    const user = await updateUserUseCase.execute(data, user_id);

    return response.status(201).json(UserInfoMap.toDTO(user!));
  }
}

export { UpdateUserController };