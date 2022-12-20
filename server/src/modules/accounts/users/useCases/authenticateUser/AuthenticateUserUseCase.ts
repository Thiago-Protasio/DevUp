import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { IAuthenticateUserDTO } from "../../dtos/IAuthenticateUserDTO";
import { UserRepository } from "../../repositories/UsersRepository";

class AuthenticateUserUseCase {
  async execute({ email, password }: IAuthenticateUserDTO) {
    const usersRepository = new UserRepository();

    const user = await usersRepository.findByEmail(email);

    if (!user) {
      throw new Error("Email or password invalid!");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password invalid!");
    }

    const token = sign({ email }, process.env.JWT_SECRET, {
      subject: user.id,
      expiresIn: "5d",
    });

    return token;
  }
}

export { AuthenticateUserUseCase };