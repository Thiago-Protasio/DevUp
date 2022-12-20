import { EducationsRepository } from "../../../repositories/EducationsRepository";

class FindEducationUseCase {
  async execute(user_id: string) {
    const educationsRepository = new EducationsRepository();
    const education = await educationsRepository.findAllEducation(user_id);

    if (education.length === 0) {
      throw new Error("Could not find any education")
    }

    return education;
  }
}

export { FindEducationUseCase };