import { ExperiencesRepository } from "../../../repositories/ExperiencesRepository";

class RemoveExperienceUseCase {
  async execute(experience_id: string, user_id: string) {
    const experiencesRepository = new ExperiencesRepository;
    const experience = await experiencesRepository.findExperience(experience_id, user_id);

    if (!experience) {
      throw new Error("Experience not found!");
    }

    await experiencesRepository.removeExperience(experience_id);
  }
}

export { RemoveExperienceUseCase };