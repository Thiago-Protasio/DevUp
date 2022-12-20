import { hash } from "bcrypt";
import { sign } from "jsonwebtoken";
import { CompaniesRepository } from "../../repositories/CompaniesRepository";

class CreateCompanyUseCase {
  async execute({
    email,
    password,
    password_confirm,
    name,
    description,
  }: ICreateCompanyDTO): Promise<string> {
    const companiesRepository = new CompaniesRepository();
    const userAlreadyExists = await companiesRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists");
    }

    if (password != password_confirm) {
      throw new Error("Password does not match");
    }

    const passwordHash = await hash(password, 10);

    const company = await companiesRepository.create({
      email,
      password: passwordHash,
      name,
      description,
    });

    const token = sign({ email }, process.env.JWT_SECRET, {
      subject: company.id,
      expiresIn: "5d",
    });

    return token;
  }
}

export { CreateCompanyUseCase };