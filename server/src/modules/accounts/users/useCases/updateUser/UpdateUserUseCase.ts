import { User } from "@prisma/client";
import { UserRepository } from "../../repositories/UsersRepository";

class UpdateUserUseCase {
  async execute(data: IUpdateUserDTO, user_id: string): Promise<User> {
    const usersRepository = new UserRepository();
    const user = usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    const newUser = await usersRepository.update(data, user_id);

    return newUser;
  }
}

export { UpdateUserUseCase };