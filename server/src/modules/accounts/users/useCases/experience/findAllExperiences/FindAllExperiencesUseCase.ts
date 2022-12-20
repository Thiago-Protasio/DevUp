import { ExperiencesRepository } from "../../../repositories/ExperiencesRepository";

class FindAllExperiencesUseCase {
  async execute(user_id: string) {
    const experiencesRepository = new ExperiencesRepository();

    const experiences = await experiencesRepository.findAllExperiences(user_id);

    if (experiences.length === 0) {
      throw new Error("Could not find any experience");
    }

    return experiences;
  }
}

export { FindAllExperiencesUseCase };