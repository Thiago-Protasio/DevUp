import { Request, Response } from "express";
import { UserInfoMap } from "../../mappers/UserInfoMap";

import { FindUserUseCase } from "./FindUserUseCase";

class FindUserController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const findUserUseCase = new FindUserUseCase();

    const user = await findUserUseCase.execute(user_id);

    return response.status(200).json(UserInfoMap.toDTO(user!));
  }
}

export { FindUserController };