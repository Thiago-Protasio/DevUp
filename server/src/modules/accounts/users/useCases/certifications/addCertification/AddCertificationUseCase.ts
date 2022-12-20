import { CertificationsRepository } from "../../../repositories/CertificationsRepository";
import { UserRepository } from "../../../repositories/UsersRepository";


class AddCertificationUseCase {
  async execute(data: IAddCertificationDTO, user_id: string) {
    const userRepository = new UserRepository();
    const certificationsRepository = new CertificationsRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    await certificationsRepository.addCertification(data, user_id);
  }
}

export { AddCertificationUseCase };