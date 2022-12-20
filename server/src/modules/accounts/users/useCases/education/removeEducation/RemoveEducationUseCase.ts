import { EducationsRepository } from "../../../repositories/EducationsRepository";

class RemoveEducationUseCase {
  async execute(education_id: string, user_id: string): Promise<void> {
    const educationsRepository = new EducationsRepository();
    const education = await educationsRepository.findEducation(education_id, user_id);

    if (!education) {
      throw new Error("Education not found!");
    }

    await educationsRepository.removeEducation(education_id);
  }
}

export { RemoveEducationUseCase };