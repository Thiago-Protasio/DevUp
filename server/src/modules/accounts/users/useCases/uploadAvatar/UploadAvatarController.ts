import { Request, Response } from "express";
import { UploadAvatarUseCase } from "./UploadAvatarUseCase";

class UploadAvatarController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const avatar = request.file!.filename;

    const uploadAvatarUseCase = new UploadAvatarUseCase();

    await uploadAvatarUseCase.execute(avatar, user_id);

    return response.status(200).send();
  }
}

export { UploadAvatarController };