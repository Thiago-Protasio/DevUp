import { compare } from "bcrypt";
import { sign } from "jsonwebtoken";
import { CompaniesRepository } from "../../repositories/CompaniesRepository";

class AuthenticateCompanyUseCase {
  async execute({ email, password }: IAuthenticateCompanyDTO) {
    const companiesRepository = new CompaniesRepository();
    const company = await companiesRepository.findByEmail(email);

    if (!company) {
      throw new Error("Email or password invalid!");
    }

    const passwordMatch = await compare(password, company.password);

    if (!passwordMatch) {
      throw new Error("Email or password invalid!");
    }

    const token = sign({ email }, process.env.JWT_SECRET, {
      subject: company.id,
      expiresIn: "5d",
    });

    return token;
  }
}

export { AuthenticateCompanyUseCase };