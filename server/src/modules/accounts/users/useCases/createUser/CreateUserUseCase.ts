import { User } from "@prisma/client";
import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { UserRepository } from "../../repositories/UsersRepository";

class CreateUserUseCase {
  async execute({ email, password, name, birthday, password_confirm }: ICreateUserDTO): Promise<string> {
    const userRepository = new UserRepository();
    const userAlreadyExists = await userRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    if (password != password_confirm) {
      throw new Error("Password does not match");
    }

    const passwordHash = await hash(password, 10);

    const user = await userRepository.create({
      email,
      password: passwordHash,
      name,
      birthday,
    })

    const token = sign({ email }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "5d",
    });

    return token;
  }
}

export { CreateUserUseCase };