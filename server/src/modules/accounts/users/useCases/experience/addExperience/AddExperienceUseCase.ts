import { IAddExperienceDTO } from "../../../dtos/IAddExperienceDTO";
import { ExperiencesRepository } from "../../../repositories/ExperiencesRepository";
import { UserRepository } from "../../../repositories/UsersRepository";

class AddExperienceUseCase {
  async execute(data: IAddExperienceDTO, user_id: string) {
    const userRepository = new UserRepository();
    const experiencesRepository = new ExperiencesRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    if (data.end_year && data.end_month) {
      if (data.start_year > data.end_year) {
        throw new Error("Invalid date!");
      }

      if (data.start_year === data.end_year && data.start_month > data.end_month) {
        throw new Error("Invalid date!");
      }
    }

    await experiencesRepository.addExperience(data, user_id);
  }
}

export { AddExperienceUseCase };