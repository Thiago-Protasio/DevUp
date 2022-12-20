import { Request, Response } from "express";
import { UploadResumeUseCase } from "./UploadResumeUseCase";

class UploadResumeController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: user_id } = request;
    const resume = request.file!.filename;

    const uploadResumeUseCase = new UploadResumeUseCase();

    await uploadResumeUseCase.execute(resume, user_id);

    return response.status(200).send();
  }
}

export { UploadResumeController };