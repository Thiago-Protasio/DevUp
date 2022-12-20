import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UsersRepository";

class FindUserUseCase {
  async execute(user_id: string) {
    const userRepository = new UserRepository();

    const user = userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    return user;
  }
}

export { FindUserUseCase };