import { EducationsRepository } from "../../../repositories/EducationsRepository";
import { UserRepository } from "../../../repositories/UsersRepository";

class AddEducationUseCase {
  async execute(data: IAddEducationDTO, user_id: string) {
    const userRepository = new UserRepository();
    const educationsRepository = new EducationsRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    if (data.start_year > data.end_year) {
      throw new Error("Invalid date!");
    }

    if (data.start_year === data.end_year && data.start_month > data.end_month) {
      throw new Error("Invalid date!");
    }

    await educationsRepository.addEducation(data, user_id);
  }
}

export { AddEducationUseCase };