import { Request, Response } from "express";
import { UploadLogoUseCase } from "./UploadLogoUseCase";

class UploadLogoController {
  async handle(request: Request, response: Response): Promise<Response> {
    const { id: company_id } = request;
    const avatar = request.file!.filename;

    const uploadLogoUseCase = new UploadLogoUseCase();

    const logo = await uploadLogoUseCase.execute(avatar, company_id);

    return response.status(200).json(logo);
  }
}

export { UploadLogoController };